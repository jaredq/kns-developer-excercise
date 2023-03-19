import { Injectable } from '@nestjs/common';
import { ApplyDiscountsInput } from './discounts/dto';
import { ApplyPricesInput } from './products/dto';
import { ProductsService } from './products/products.service';
import { DiscountsService } from './discounts/discounts.service';
import { ScanInput, ScanOutput } from './dto';

@Injectable()
export class AppService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly discountsService: DiscountsService,
  ) {}

  getHello(): string {
    return 'KNS Pricing and Discounting Service';
  }

  async scan(payload: ScanInput): Promise<ScanOutput> {
    console.debug('scan()#payload', payload);

    const { products } = payload;

    const applyPricesInput: ApplyPricesInput = {
      names: products,
    };
    const applyPricesOutput = await this.productsService.applyPrices(
      applyPricesInput,
    );
    console.log('applyPricesOutput', applyPricesOutput);

    const applyDiscountsInput: ApplyDiscountsInput = {
      products: applyPricesOutput.products.map((p) => ({
        product: p.name,
        price: p.price,
        notFound: p.notFound,
      })),
    };
    const applyDiscountsOutput = await this.discountsService.applyDiscounts(
      applyDiscountsInput,
    );
    console.log('applyDiscountsOutput', applyDiscountsOutput);

    return {
      products: applyDiscountsOutput.resultedProducts.map((p) => ({
        name: p.product,
        price: p.price,
        notFound: p.notFound,
        resultedPrice: p.resultedPrice,
        discountCode: p.discountCode,
      })),
      totalPrice: applyDiscountsOutput.total,
    };
  }
}
