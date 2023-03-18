import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { DiscountProcessor, ResultedProductItem } from './discount.processor';

@Injectable()
export class DiscountBuy1Get1HalfPriceProcessor implements DiscountProcessor {
  static readonly code: string = 'buy1get1halfprice';

  process(
    productItems: ResultedProductItem[],
    discountProducts: string[],
  ): ResultedProductItem[] {
    console.debug(
      'DiscountBuy1Get1HalfPriceProcessor.process()#payload',
      productItems,
      discountProducts,
    );

    const result: ResultedProductItem[] = _.map(productItems, (productItem) => {
      if (discountProducts.indexOf(productItem.product) >= 0) {
        productItem.resultedPrice = productItem.price - 0.4;
        productItem.discountCode = DiscountBuy1Get1HalfPriceProcessor.code;
      }
      return productItem;
    });

    console.debug(
      'DiscountBuy1Get1HalfPriceProcessor.process()#result',
      result,
    );
    return result;
  }
}
