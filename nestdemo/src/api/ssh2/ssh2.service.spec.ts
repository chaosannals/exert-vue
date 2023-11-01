import { Test, TestingModule } from '@nestjs/testing';
import { Ssh2Service } from './ssh2.service';

describe('Ssh2Service', () => {
  let service: Ssh2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ssh2Service],
    }).compile();

    service = module.get<Ssh2Service>(Ssh2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
