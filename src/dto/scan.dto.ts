import { CommonResponse } from '../shared/dto';

class ProductItem {
  name: string;
  price: number;
  notFound: boolean;
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
