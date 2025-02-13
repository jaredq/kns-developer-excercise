import * as _ from 'lodash';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { DiscountProcessorMap } from './../processors/discount.processor.map';
import { Discount } from '../entities/discount.entity';
import {
  CreateDiscountInput,
  CreateDiscountOutput,
  CancelDiscountInput,
  CancelDiscountOutput,
  ApplyDiscountsInput,
  ApplyDiscountsOutput,
} from './dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    private readonly discountProcessorMap: DiscountProcessorMap,
  ) {}

  async createDiscount(
    payload: CreateDiscountInput,
  ): Promise<CreateDiscountOutput> {
    console.debug('createDiscount()#payload', payload);

    const { code, product, startTime, endTime } = payload;

    // startTime must be earlier than endTime
    if (startTime.getTime() >= endTime.getTime()) {
      throw new BadRequestException(`startTime must be earlier than endTime`);
    }

    // only one discount can be applied to a product at a time
    const existingDiscounts = await this.discountRepository.find({
      where: {
        product,
        startTime: LessThanOrEqual(endTime),
        endTime: MoreThanOrEqual(startTime),
      },
    });
    if (existingDiscounts && existingDiscounts.length > 0) {
      throw new BadRequestException(`Discount already exists for ${product}`);
    }

    const discount = new Discount();
    discount.code = code;
    discount.product = product;
    discount.startTime = startTime;
    discount.endTime = endTime;
    return await this.discountRepository.save(discount);
  }

  async cancelDiscount(
    payload: CancelDiscountInput,
  ): Promise<CancelDiscountOutput> {
    console.debug('cancelDiscount()#payload', payload);

    const { id } = payload;
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) {
      throw new NotFoundException(`Discount with id ${id} not found`);
    }
    const result = await this.discountRepository.delete(id);
    if (result.affected > 0) {
      return { id };
    }
  }

  async applyDiscounts(
    payload: ApplyDiscountsInput,
  ): Promise<ApplyDiscountsOutput> {
    console.debug('applyDiscounts()#payload', payload);

    const { products } = payload;

    // find current relevant valid discounts
    const productNames = _.uniq(_.map(products, 'product'));

    const now = new Date();
    const discountItems = await this.discountRepository.find({
      where: {
        product: Any(productNames),
        startTime: LessThanOrEqual(now),
        endTime: MoreThanOrEqual(now),
      },
    });

    // get the codes of current relevant valid discounts
    const discountCodes = _.uniq(_.map(discountItems, 'code'));

    // convert the product list to resulted product list
    let resultedProducts = products.map((p) => ({
      product: p.product,
      price: p.price,
      notFound: p.notFound,
      resultedPrice: p.price,
    }));

    // apply each relevant discount processors
    resultedProducts = _.reduce(
      discountCodes,
      (resultedProducts, discountCode) => {
        const discountProcessor =
          this.discountProcessorMap.getProcessor(discountCode);

        // get discount products related to this discount code
        // as all relevant discounts have been retrieved above
        // so, pass the discounted products to the corresponding processor for reducing the database query
        const discountProducts = _.uniq(
          _.map(discountItems, (discountItem) => {
            if (discountItem.code === discountCode) return discountItem.product;
          }),
        );
        return discountProcessor.process(resultedProducts, discountProducts);
      },
      resultedProducts,
    );

    // calculate total price
    const total = _.reduce(
      resultedProducts,
      (sum, resultedProduct) =>
        sum + (!resultedProduct.notFound ? resultedProduct.resultedPrice : 0),
      0,
    );

    const result: ApplyDiscountsOutput = {
      resultedProducts: resultedProducts,
      total,
    };
    return result;
  }
}
