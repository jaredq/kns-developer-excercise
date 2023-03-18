import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { DiscountProcessor, ResultedProductItem } from './discount.processor';

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

    const result: ResultedProductItem[] = _.map(productItems, (productItem) => {
      if (discountProducts.indexOf(productItem.product) >= 0) {
        productItem.resultedPrice = productItem.price - 0.3;
        productItem.discountCode = Discount2For3Processor.code;
      }
      return productItem;
    });

    console.debug('Discount2For3Processor.process()#result', result);
    return result;
  }
}
