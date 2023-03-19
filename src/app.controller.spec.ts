import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountsService } from './discounts/discounts.service';
import { ProductsService } from './products/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Discount } from './entities';
import { Discount2For3Processor } from './processors/discount-2for3.processor';
import { DiscountBuy1Get1HalfPriceProcessor } from './processors/discount-buy1get1halfprice.processor';
import { DiscountHalfPriceProcessor } from './processors/discount-halfprice.processor';
import { DiscountProcessorMap } from './processors/discount.processor.map';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository<Product>,
        },
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

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "KNS Pricing and Discounting Service"', () => {
      expect(appController.getHello()).toBe(
        'KNS Pricing and Discounting Service',
      );
    });
  });

  describe('scan', () => {
    it('should return { products, totalPrice } ', () => {
      expect(appController.getHello()).toBe(
        'KNS Pricing and Discounting Service',
      );
    });
  });
});
