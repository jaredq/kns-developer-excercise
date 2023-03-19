import { CommonResponse } from './../../shared/dto/common.dto';
import { IsNotEmpty } from 'class-validator';

// input DTO for service
export class SaveProductInput {
  name: string;
  price: number;
}

// output DTO for service
export class SaveProductOutput {
  id: number;
  name: string;
  price: number;
}

// request DTO for controller
export class SaveProductRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;
}

// response DTO for controller
export class SaveProductResponse extends CommonResponse {
  data: SaveProductOutput;
}
