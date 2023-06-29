import { HostListener, Component } from "@angular/core";
import * as math from "mathjs";
import { Equation } from "../models/Equation";
import { RestapiService } from "../services/restapi.service";
import { AccountServiceService } from "../services/account-service.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  // Grid of buttons for the calculator
  // includes the value of the button and the color of the button
  grid: string[][][] =
    [
      [['(', 'charcoal'], [')', 'charcoal'], [Operator.C, 'red'], [Operator.CE, 'red']],
      [['7', 'blue'], ['8', 'blue'], ['9', 'blue'], [Operator.Multiply, 'charcoal']],
      [['4', 'blue'], ['5', 'blue'], ['6', 'blue'], [Operator.Add, 'charcoal']],
      [['1', 'blue'], ['2', 'blue'], ['3', 'blue'], [Operator.Subtract, 'charcoal']],
      [['%', 'blue'], ['0', 'blue'], ['.', 'blue'], [Operator.Divide, 'charcoal']],
      [[Operator.Power, 'blue'], [Operator.Square, 'blue'], [Operator.SquareRoot, 'blue'], [Operator.Equals, 'red']]
    ];


  equations: Equation[] = [];

  equationString: string = '';

  // internalEquationString is used to evaluate the equation
  // it is separate from equationString because equationString
  // is used to display the equation to the user
  // and uses special characters for exponents
  internalEquationString: string = '';

  isParenthesisOpen: boolean = false;

  hasDecimal: boolean = false;

  powerState: boolean = false;

  result: number = 0;

  constructor(private api: RestapiService, private accountService: AccountServiceService) {
    if (accountService.isLoggedIn) {
      this.fetchEquations();
    }
  }

  fetchEquations() {
    this.api.getEquations().subscribe((data: any) => {
      for (let i = 0; i < data.body.length; i++) {
        let temp = data.body[i];
        let equation = Equation.fromJSON(temp);
        this.equations.push(equation);
      }
    });
  }


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        this.onButtonClick(Operator.Equals);
        return;
      case 'Backspace':
        this.C();
        return;
    }
    if (event.key.match(/[0-9]/) || event.key.match(/[\+\-\*\/]/) || event.key === '.') {
      this.onButtonClick(event.key);
    }
  }

  onButtonClick(value: any) {
    let isNumber = value.match(/[0-9]/);

    if (this.powerState && isNumber) {
      if (value > 3) {
        this.equationString += String.fromCharCode(8304 + parseInt(value[0]));
      }
      else {
        this.equationString += String.fromCharCode(176 + parseInt(value[0]));
      }
      this.internalEquationString += Operator.Exponent + value;
      this.powerState = false;
      return;
    }

    switch (value) {
      case Operator.Equals:
        this.equals();
        return;
      case Operator.CE:
        this.CE();
        return;
      case Operator.C:
        this.C();
        return;
      case Operator.Decimal:
        this.handleDecimal();
        return;
      case Operator.Power:
        this.powerState = true;
        return;
      case Operator.Multiply:
        this.internalEquationString += '*';
        break;
      case Operator.SquareRoot:
        this.handleSquareRoot();
        return;
      case ")":
        this.handleCloseParenthesis();
        return;
      case "(":
        this.handleOpenParenthesis();
        return;
      default:
        this.internalEquationString += value;
    }
    this.equationString += value;
  }

  handleDecimal() {
    if (this.hasDecimal) return;
    let indx = this.equationString.search(/[0-9].?$/);
    if (indx < 0) {
      this.equationString += '0';
    }
    this.equationString += '.';
    this.internalEquationString += '.';
  }

  handleOpenParenthesis() {
    if (this.equationString.charAt(this.equationString.length - 1).match(/[0-9]/)) {
      this.equationString += Operator.Multiply + '(';
      this.internalEquationString += '*(';
      this.isParenthesisOpen = true;
    }
    else {
      this.equationString += '(';
      this.internalEquationString += '(';
      this.isParenthesisOpen = true;
    }
  }

  handleCloseParenthesis() {
    if (this.isParenthesisOpen) {
      this.equationString += ')';
      this.internalEquationString += ')';
      this.isParenthesisOpen = false;
    }
  }

  handleSquareRoot() {
    this.internalEquationString += 'sqrt(';
    this.equationString += Operator.SquareRoot + '(';
    this.isParenthesisOpen = true;
  }

  CE() {
    this.equationString = '';
    this.internalEquationString = '';
    this.result = 0;
  }

  C() {
    let indx = this.equationString.search(/[^0-9].?$/);
    let internalIndx = this.internalEquationString.search(/[^0-9].?$/);
    if (indx <= 0) {
      this.CE();
    }
    this.equationString = this.equationString.slice(0, indx + 1);
    this.internalEquationString = this.internalEquationString.slice(0, internalIndx + 1);
  }

  // evaluate the equation using mathjs
  eval(equation: string) {
    if (equation === '') return;
    if (this.isParenthesisOpen) return;
    let copy = String(equation);
    return math.evaluate(copy);
  }

  equals() {
    if (this.equationString === '') return;
    this.result = this.eval(this.internalEquationString);
    if (this.result === undefined) return;
    this.pushEquation();
    this.equationString = '';
    this.internalEquationString = '';
  }

  pushEquation() {
    let equation: Equation = Equation.fromFront(this.equationString, this.result.toString());
    this.equations.push(equation);
    if (this.accountService.isLoggedIn) {
      this.api.saveEquation(equation).subscribe();
    }
  }
}

enum Operator {
  Power = 'x\u207f',
  Square = 'x\u00B2',
  SquareRoot = '\u221A',
  CE = 'CE',
  C = 'C',
  NaN = 'NaN',
  Add = '+',
  Subtract = '-',
  Multiply = '\u00D7',
  Divide = '/',
  Equals = '=',
  Decimal = '.',
  Exponent = '^',
  Percent = '%'
}