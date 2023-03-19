import { CommonResponse } from '../../shared/dto/common.dto';

// input DTO for service
export class CancelDiscountInput {
  id: number;
}

// output DTO for service
export class CancelDiscountOutput {
  id: number;
}

// response DTO for controller
export class CancelDiscountResponse extends CommonResponse {
  data: CancelDiscountOutput;
}
