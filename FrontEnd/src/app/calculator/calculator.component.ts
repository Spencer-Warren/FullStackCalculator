import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  grid: string[][][] = 
  [
    [['C',   'red' ], ['CE', 'red'], ['%'], ['/']         ],
    [['7',   'blue'], ['8', 'blue'], ['9', 'blue'], ['*'] ],
    [['4',   'blue'], ['5', 'blue'], ['6', 'blue'], ['+'] ],
    [['1',   'blue'], ['2', 'blue'], ['3', 'blue'], ['-'] ],
    [['-/+', 'blue'], ['0', 'blue'], ['.'], ['=']         ]
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