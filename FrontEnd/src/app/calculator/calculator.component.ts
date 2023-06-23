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

  operatorState: string = '';

  equationString: string = '';

  numStringTemp: string = '';

  numTemp: number = 0;

  result: number = 0;


  constructor() { }

  onButtonClick(value: any) {
    if (value === Operator.Equals) {
      this.result = eval(this.equationString);
      return;
    }
    this.equationString += value;
  }

  calculate() {
    
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