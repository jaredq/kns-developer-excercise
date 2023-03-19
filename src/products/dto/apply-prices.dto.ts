class ProductItem {
  name: string;
  price?: number;
  notFound?: boolean;
}

// input DTO for service
export class ApplyPricesInput {
  names: string[];
}

// output DTO for service
export class ApplyPricesOutput {
  products: ProductItem[];
}
