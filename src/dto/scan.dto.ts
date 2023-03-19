import { CommonResponse } from 'src/shared/dto';

class ProductItem {
  name: string;
  price: number;
  resultedPrice: number;
  discountCode?: string;
}

export class ScanInput {
  products: string[];
}

export class ScanOutput {
  products: ProductItem[];
  totalPrice: number;
}

export class ScanRequest {
  products: string[];
}

export class ScanResponse extends CommonResponse {
  data: ScanOutput;
}
