import { Discount2For3Processor } from './discount-2for3.processor';
import { ResultedProductItem } from './discount.processor';

describe('Discount2For3Processor', () => {
  let processor: Discount2For3Processor;

  beforeEach(async () => {
    processor = new Discount2For3Processor();
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  it('should mark one discounted product', () => {
    const expectedProductItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 0,
        discountCode: '2for3',
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];

    const productItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 10,
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];
    const discountProducts: string[] = ['banana', 'mango', 'orange'];

    const resultedProductItems = processor.process(
      productItems,
      discountProducts,
    );
    expect(resultedProductItems).toEqual(expectedProductItems);
  });

  it('should mark two discounted products', () => {
    const expectedProductItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 0,
        discountCode: '2for3',
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 0,
        discountCode: '2for3',
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];

    const productItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 10,
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];
    const discountProducts: string[] = ['apple', 'banana', 'mango', 'orange'];

    const resultedProductItems = processor.process(
      productItems,
      discountProducts,
    );
    expect(resultedProductItems).toEqual(expectedProductItems);
  });

  it('should not mark any discounted products', () => {
    const expectedProductItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 10,
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];

    const productItems: ResultedProductItem[] = [
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'banana',
        price: 10,
        resultedPrice: 10,
      },
      {
        product: 'orange',
        price: 40,
        resultedPrice: 40,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'apple',
        price: 20,
        resultedPrice: 20,
      },
      {
        product: 'mango',
        price: 30,
        resultedPrice: 30,
      },
      {
        product: 'pear',
        price: 24,
        resultedPrice: 24,
      },
    ];
    const discountProducts: string[] = [];

    const resultedProductItems = processor.process(
      productItems,
      discountProducts,
    );
    expect(resultedProductItems).toEqual(expectedProductItems);
  });
});
