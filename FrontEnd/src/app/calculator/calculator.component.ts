import { HostListener, Component } from "@angular/core";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  grid: string[][][] = 
  [
    [['%', 'charcoal'], ['/', 'charcoal'], ['C',   'red' ], ['CE', 'red']],
    [['7',   'blue'], ['8', 'blue'], ['9', 'blue'],     [Operator.Multiply, 'charcoal'] ],
    [['4',   'blue'], ['5', 'blue'], ['6', 'blue'],     ['+', 'charcoal'] ],
    [['1',   'blue'], ['2', 'blue'], ['3', 'blue'],     ['-', 'charcoal'] ],
    [['(-)', 'blue'], ['0', 'blue'], ['.', 'charcoal'], ['=', 'red'] ],
    [['x\u207f', 'blue'], ['x^2', 'blue'], ['x^3', 'blue'], ['x^4', 'blue']]
  ];
  

  equations: string[] = [
    '1+1',
  ];

  equationString: string = '';

  hasDecimal: boolean = false;

  result: number = 0;


  constructor() { }

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
    console.log(value);
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
    }
   
    this.equationString += value;
  }

  handleDecimal() {
    if (this.hasDecimal) return;
    let indx = this.equationString.search(/[^0-9].?$/);
    if (indx <= 0) {
      this.equationString += '0';
    }
    this.equationString += '.';
  }

  CE() {
    this.equationString = '';
    this.result = 0;
  }

  C() {
    let indx = this.equationString.search(/[^0-9].?$/);
    if (indx <= 0) {
      this.CE();
    }
    this.equationString = this.equationString.slice(0, indx + 1);
  }

  eval(equation: string) {
    let equationCopy = String(equation);
    equationCopy = equationCopy.replaceAll(/\%/g,"/100");
    equationCopy = equationCopy.replaceAll(Operator.Multiply,"*");
    return eval(equationCopy);
  }

  equals() {
    if (this.equationString === '') return;
    this.result = this.eval(this.equationString);
    this.equations.push(this.equationString);
    this.equationString = '';
  }

}

enum Operator {
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
}