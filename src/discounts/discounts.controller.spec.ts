import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities';
import { Discount2For3Processor } from '../processors/discount-2for3.processor';
import { DiscountBuy1Get1HalfPriceProcessor } from '../processors/discount-buy1get1halfprice.processor';
import { DiscountHalfPriceProcessor } from '../processors/discount-halfprice.processor';
import { DiscountProcessorMap } from '../processors/discount.processor.map';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

describe('DiscountsController', () => {
  let controller: DiscountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountsController],
      providers: [
        DiscountsService,
        {
          provide: getRepositoryToken(Discount),
          useClass: Repository<Discount>,
        },
        DiscountProcessorMap,
        DiscountHalfPriceProcessor,
        Discount2For3Processor,
        DiscountBuy1Get1HalfPriceProcessor,
      ],
    }).compile();

    controller = module.get<DiscountsController>(DiscountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
