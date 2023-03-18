import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItem {
  @IsString()
  product: string;

  @IsNumber()
  price: number;
}

export class DiscountedProductItem {
  product: string;
  price: number;
  discountedPrice: number;
  discountCode: string;
}

export class ApplyDiscountsInput {
  products: ProductItem[];
}

export class ApplyDiscountsOutput {
  discountedProducts: DiscountedProductItem[];
}

export class ApplyDiscountsRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItem)
  products: ProductItem[];
}

export class ApplyDiscountsResponse {
  data: ApplyDiscountsOutput;
}
