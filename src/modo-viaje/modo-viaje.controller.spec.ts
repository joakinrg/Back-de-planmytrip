import { Test, TestingModule } from '@nestjs/testing';
import { ModoViajeController } from './modo-viaje.controller';
import { ModoViajeService } from './modo-viaje.service';

describe('ModoViajeController', () => {
  let controller: ModoViajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModoViajeController],
      providers: [ModoViajeService],
    }).compile();

    controller = module.get<ModoViajeController>(ModoViajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
