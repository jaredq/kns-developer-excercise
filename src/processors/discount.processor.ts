export class ResultedProductItem {
  product: string;
  price: number;
  resultedPrice: number;
  discountCode?: string;
}

export interface DiscountProcessor {
  process: (
    productItems: ResultedProductItem[],
    discountProducts: string[],
  ) => ResultedProductItem[];
}
