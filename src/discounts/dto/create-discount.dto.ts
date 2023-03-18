import { CommonResponse } from './../../shared/dto/common.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// input DTO for service
export class CreateDiscountInput {
  code: string;
  product: string;
  startTime: Date;
  endTime: Date;
}

// output DTO for service
export class CreateDiscountOutput {
  id: number;
  code: string;
  startTime: Date;
  endTime: Date;
}

// request DTO for controller
export class CreateDiscountRequest {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;

  @IsNotEmpty()
  @Type(() => Date)
  endTime: Date;
}

// response DTO for controller
export class CreateDiscountResponse extends CommonResponse {
  data: CreateDiscountOutput;
}
