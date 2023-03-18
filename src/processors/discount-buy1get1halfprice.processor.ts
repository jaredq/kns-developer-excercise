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

    // mark if a product has been scanned once. delete it if the same product is scanned again.
    // the key is product name and the value is its prodcut item.
    const prevProduct = {};

    const result: ResultedProductItem[] = _.map(productItems, (productItem) => {
      if (discountProducts.indexOf(productItem.product) >= 0) {
        if (prevProduct[productItem.product]) {
          productItem.resultedPrice = productItem.price / 2;
          productItem.discountCode = DiscountBuy1Get1HalfPriceProcessor.code;
          delete prevProduct[productItem.product];
        } else {
          prevProduct[productItem.product] = productItem;
        }
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
