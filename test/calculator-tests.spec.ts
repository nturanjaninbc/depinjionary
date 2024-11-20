import { mockProviders } from "./test-providers";
import { ContainerResolver } from "@container/container-resolver";
import { CalculatorService } from "@application/calculator/calculator.service";

describe('Calculator service tests', () => {
  test('2 + 2 should be 4', async () => {
    const container = ContainerResolver.init(mockProviders);

    let calculatorService = await container.resolve<CalculatorService>(CalculatorService);
    let expected = 3 + 4;
    let result = calculatorService.add(3, 4);
    
    expect(result).toBe(expected);
  })
});
  