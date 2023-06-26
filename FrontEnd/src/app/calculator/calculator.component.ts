import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  grid: string[][][] = 
  [
    [['C',   'red' ], ['CE', 'red'], ['%', 'charcoal'], ['/', 'charcoal'] ],
    [['7',   'blue'], ['8', 'blue'], ['9', 'blue'],     ['*', 'charcoal'] ],
    [['4',   'blue'], ['5', 'blue'], ['6', 'blue'],     ['+', 'charcoal'] ],
    [['1',   'blue'], ['2', 'blue'], ['3', 'blue'],     ['-', 'charcoal'] ],
    [['(-)', 'blue'], ['0', 'blue'], ['.', 'charcoal'], ['=', 'charcoal'] ]
  ];

  equations: string[] = [
    '1+1',
  ];

  equationString: string = '';

  hasDecimal: boolean = false;

  result: number = 0;


  constructor() { }

  onButtonClick(value: any) {
    switch (value) {
      case Operator.Equals:
        this.result = eval(this.equationString);
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
    if (-0
      )
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
    return eval(equation);
  }

}

enum Operator {
  CE = 'CE',
  C = 'C',
  NaN = 'NaN',
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Equals = '=',
  Decimal = '.',
}