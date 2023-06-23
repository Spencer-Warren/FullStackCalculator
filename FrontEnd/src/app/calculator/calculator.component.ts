import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  grid: string[][] = 
  [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  operatorState: Operator = Operator.NaN;

  equationString: string = '';

  numStringTemp: string = '';

  numTemp: number = 0;

  result: number = 0;


  constructor() { }

  onButtonClick(value: any) {
    console.log(value);
    if (Number(value) || value == 0 || value === '.') {
      this.numStringTemp += value;
      this.equationString += value;
      return;
    }

    this.numTemp = Number(this.numStringTemp);
    this.numStringTemp = '';

    if (value == Operator.Equals && this.operatorState !== Operator.NaN) {
      this.calculate();
      return;
    }
    
    if (value !== Operator.Equals) {
      this.equationString += value;
    }
    
    this.operatorState = value;
  }

  calculate() {
    let number = Number(this.numStringTemp);
    switch (this.operatorState) {
      case Operator.Add:
        this.result = this.numTemp + number;
        break;
      case Operator.Subtract:
        this.result = this.numTemp - number;
        break;
      case Operator.Multiply:
        this.result = this.numTemp * number;
        break;
      case Operator.Divide:
        this.result = this.numTemp / number;
        break;
      case Operator.Equals:
        this.result = number;
        break;
      default:
        break;
    }
  }

}

enum Operator {
  NaN = 'NaN',
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Equals = '='
}