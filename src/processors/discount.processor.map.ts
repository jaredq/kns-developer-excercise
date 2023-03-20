import { Injectable } from '@nestjs/common';
import { DiscountHalfPriceProcessor } from './discount-halfprice.processor';
import { Discount2For3Processor } from './discount-2for3.processor';
import { DiscountBuy1Get1HalfPriceProcessor } from './discount-buy1get1halfprice.processor';

@Injectable()
export class DiscountProcessorMap {
  constructor(
    private readonly discountHalfPriceProcessor: DiscountHalfPriceProcessor,
    private readonly discount2For3Processor: Discount2For3Processor,
    private readonly discountBuy1Get1HalfPriceProcessor: DiscountBuy1Get1HalfPriceProcessor,
  ) {}

  getProcessor(code: string) {
    switch (code) {
      case DiscountHalfPriceProcessor.code:
        return this.discountHalfPriceProcessor;
      case Discount2For3Processor.code:
        return this.discount2For3Processor;
      case DiscountBuy1Get1HalfPriceProcessor.code:
        return this.discountBuy1Get1HalfPriceProcessor;
    }
  }
}
