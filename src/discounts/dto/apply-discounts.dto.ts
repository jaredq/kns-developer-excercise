import { CommonResponse } from './../../shared/dto/common.dto';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItem {
  @IsString()
  product: string;

  @IsNumber()
  price: number;
}

export class ResultedProductItem {
  product: string;
  price: number;
  resultedPrice: number;
  discountCode?: string;
}

export class ApplyDiscountsInput {
  products: ProductItem[];
}

export class ApplyDiscountsOutput {
  resultedProducts: ResultedProductItem[];
  total: number;
}

export class ApplyDiscountsRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItem)
  products: ProductItem[];
}

export class ApplyDiscountsResponse extends CommonResponse {
  data: ApplyDiscountsOutput;
}
