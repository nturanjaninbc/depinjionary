import { Injectable } from '@container/decorators/injectable.decorator';

@Injectable()
export class App {
  constructor() {}

  run() {
    console.log('app started...')
  }
}