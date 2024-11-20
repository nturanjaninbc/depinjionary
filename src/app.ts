import { CalculatorService } from '@application/calculator/calculator.service';
import { Injectable } from '@container/decorators/injectable.decorator';

@Injectable()
export class App {
  constructor(private readonly calculatorService: CalculatorService) {}

  run() {
    this.calculatorService.add(2, 5);
    this.calculatorService.add(5, 12);
    this.calculatorService.sub(7, 3);

    this.calculatorService.showHistory();
  }
}