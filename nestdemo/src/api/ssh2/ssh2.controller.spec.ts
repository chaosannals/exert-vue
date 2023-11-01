import { Test, TestingModule } from '@nestjs/testing';
import { Ssh2Controller } from './ssh2.controller';

describe('Ssh2Controller', () => {
  let controller: Ssh2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ssh2Controller],
    }).compile();

    controller = module.get<Ssh2Controller>(Ssh2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
