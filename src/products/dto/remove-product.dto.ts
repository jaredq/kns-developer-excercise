import { CommonResponse } from '../../shared/dto/common.dto';

// input DTO for service
export class RemoveProductInput {
  id: number;
}

// output DTO for service
export class RemoveProductOutput {
  id: number;
}

// response DTO for controller
export class RemoveProductResponse extends CommonResponse {
  data: RemoveProductOutput;
}
