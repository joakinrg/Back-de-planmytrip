import { Test, TestingModule } from '@nestjs/testing';
import { TransporteController } from './transporte.controller';
import { TransporteService } from './transporte.service';

describe('TransporteController', () => {
  let controller: TransporteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransporteController],
      providers: [TransporteService],
    }).compile();

    controller = module.get<TransporteController>(TransporteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
