import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { DiscountProcessor, ResultedProductItem } from './discount.processor';

const DISCOUNTED_RATE = 0.5;
@Injectable()
export class DiscountHalfPriceProcessor implements DiscountProcessor {
  static readonly code: string = 'halfprice';

  process(
    productItems: ResultedProductItem[],
    discountProducts: string[],
  ): ResultedProductItem[] {
    console.debug(
      'DiscountHalfPriceProcessor.process()#payload',
      productItems,
      discountProducts,
    );

    const result: ResultedProductItem[] = _.map(productItems, (productItem) => {
      if (discountProducts.indexOf(productItem.product) >= 0) {
        productItem.resultedPrice = productItem.price * (1 - DISCOUNTED_RATE);
        productItem.discountCode = DiscountHalfPriceProcessor.code;
      }
      return productItem;
    });

    return result;
  }
}
