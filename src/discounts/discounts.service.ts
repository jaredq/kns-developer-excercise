import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';
import {
  CreateDiscountInput,
  CreateDiscountOutput,
} from './dto/create-discount.dto';
import { CancelDiscountInput, CancelDiscountOutput } from './dto';
import {
  ApplyDiscountsInput,
  ApplyDiscountsOutput,
} from './dto/apply-discounts.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async createDiscount(
    payload: CreateDiscountInput,
  ): Promise<CreateDiscountOutput> {
    const { code, product, startTime, endTime } = payload;
    const discount = new Discount();
    discount.code = code;
    discount.product = product;
    discount.startTime = startTime;
    discount.endTime = endTime;

    // TODO only one discount can be applied to a product at a time

    return await this.discountRepository.save(discount);
  }

  async cancelDiscount(
    payload: CancelDiscountInput,
  ): Promise<CancelDiscountOutput> {
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
    const { products } = payload;
    // TODO find current valid discounts
    const discounts = await this.discountRepository.find({});

    // TODO apply each discount to the product list
    const discountedProducts = products.map((p) => ({
      product: p.product,
      price: p.price,
      discountedPrice: 5,
      discountCode: 'discountCode',
    }));
    const result: ApplyDiscountsOutput = {
      discountedProducts,
    };
    return result;
  }
}
