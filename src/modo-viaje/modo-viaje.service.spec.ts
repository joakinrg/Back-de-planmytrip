import { Test, TestingModule } from '@nestjs/testing';
import { ModoViajeService } from './modo-viaje.service';

describe('ModoViajeService', () => {
  let service: ModoViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModoViajeService],
    }).compile();

    service = module.get<ModoViajeService>(ModoViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
