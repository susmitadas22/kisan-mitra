import { Injectable } from '@nestjs/common';

@Injectable()
export class Create {
  constructor() {}

  async execute(command: any) {
    return 'Hello from Create usecase';
  }
}
