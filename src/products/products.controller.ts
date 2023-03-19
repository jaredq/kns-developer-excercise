import {
  BadRequestException,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  RemoveProductInput,
  RemoveProductResponse,
  SaveProductInput,
  SaveProductRequest,
  SaveProductResponse,
} from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async saveProduct(
    @Body() body: SaveProductRequest,
  ): Promise<SaveProductResponse> {
    try {
      const payload: SaveProductInput = {
        name: body.name,
        price: body.price,
      };
      const result = await this.productsService.saveProduct(payload);
      return {
        success: true,
        message: `Product with name ${body.name} has been saved.`,
        data: result,
      };
    } catch (error) {
      console.error('saveProduct', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new HttpException(
          'Unable to save product.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: number): Promise<RemoveProductResponse> {
    try {
      const payload: RemoveProductInput = {
        id: id,
      };
      const result = await this.productsService.removeProduct(payload);
      return {
        success: true,
        message: `Product with id ${id} has been removed.`,
        data: result,
      };
    } catch (error) {
      console.error('removeProduct', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Unable to remove product.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
