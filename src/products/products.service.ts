import * as _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { Product } from 'src/entities';
import {
  ApplyPricesInput,
  ApplyPricesOutput,
  RemoveProductInput,
  RemoveProductOutput,
  SaveProductInput,
  SaveProductOutput,
} from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async saveProduct(payload: SaveProductInput): Promise<SaveProductOutput> {
    console.debug('saveProduct()#payload', payload);

    const { name, price } = payload;

    // find the existing product
    let product = await this.productRepository.findOneBy({
      name,
    });

    if (!product) {
      product = new Product();
      product.name = name;
    }
    product.price = price;
    return await this.productRepository.save(product);
  }

  async removeProduct(
    payload: RemoveProductInput,
  ): Promise<RemoveProductOutput> {
    console.debug('removeProduct()#payload', payload);

    const { id } = payload;
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const result = await this.productRepository.delete(id);
    if (result.affected > 0) {
      return { id };
    }
  }

  async applyPrices(payload: ApplyPricesInput): Promise<ApplyPricesOutput> {
    console.debug('findProducts()#payload', payload);

    const { names } = payload;

    // query the name related products from Product table
    const uniqueNames = _.uniq(names);
    const products = await this.productRepository.find({
      where: {
        name: Any(uniqueNames),
      },
    });
    console.debug('applyPrices()#products', products);

    // convert to map<{ name: price }> for retrieve price by name below
    const productNameToPriceMap = _.reduce(
      products,
      (result, product) => {
        result[product.name] = product.price;
        return result;
      },
      {},
    );
    console.debug('applyPrices()#productNameToPriceMap', productNameToPriceMap);

    const result = _.map(names, (name) => ({
      name,
      price: productNameToPriceMap[name],
    }));
    console.debug('applyPrices()#result', result);

    return { products: result };
  }
}
