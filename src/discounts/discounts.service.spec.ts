import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountsService } from './discounts.service';
import { Discount } from '../entities';
import { DiscountProcessorMap } from '../processors/discount.processor.map';
import { Discount2For3Processor } from '../processors/discount-2for3.processor';
import { DiscountBuy1Get1HalfPriceProcessor } from '../processors/discount-buy1get1halfprice.processor';
import { DiscountHalfPriceProcessor } from '../processors/discount-halfprice.processor';

describe('DiscountsService', () => {
  let service: DiscountsService;
  let discountRepository: Repository<Discount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<DiscountsService>(DiscountsService);
    discountRepository = module.get(getRepositoryToken(Discount));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(discountRepository).toBeDefined();
  });
});
