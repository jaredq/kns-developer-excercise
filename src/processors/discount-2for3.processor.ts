import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { DiscountProcessor, ResultedProductItem } from './discount.processor';

const DISCOUNT_GROUP_SIZE = 3;
const DISCOUNT_RESULTED_PRICE = 0;
@Injectable()
export class Discount2For3Processor implements DiscountProcessor {
  static readonly code: string = '2for3';

  process(
    productItems: ResultedProductItem[],
    discountProducts: string[],
  ): ResultedProductItem[] {
    console.debug(
      'Discount2For3Processor.process()#payload',
      productItems,
      discountProducts,
    );

    // store the previous products. apply discount once it has 3 items matched, and clear the array.
    let prevProducts = [];

    const result: ResultedProductItem[] = _.map(productItems, (productItem) => {
      if (discountProducts.indexOf(productItem.product) >= 0) {
        prevProducts.push(productItem);
        if (prevProducts.length === DISCOUNT_GROUP_SIZE) {
          // set the cheapest one's resulted price to zero
          const cheapestItem = _.minBy(prevProducts, 'price');
          cheapestItem.resultedPrice = DISCOUNT_RESULTED_PRICE;
          cheapestItem.discountCode = Discount2For3Processor.code;
          prevProducts = [];
        }
      }
      return productItem;
    });

    console.debug('Discount2For3Processor.process()#result', result);
    return result;
  }
}
