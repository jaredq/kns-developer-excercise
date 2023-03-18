import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { DiscountProcessor, ResultedProductItem } from './discount.processor';

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
        productItem.resultedPrice = productItem.price / 2;
        productItem.discountCode = DiscountHalfPriceProcessor.code;
      }
      return productItem;
    });

    console.debug('DiscountHalfPriceProcessor.process()#result', result);
    return result;
  }
}
