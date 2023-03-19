import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateDiscountRequest,
  CreateDiscountInput,
  CreateDiscountResponse,
  CancelDiscountInput,
  CancelDiscountResponse,
  ApplyDiscountsInput,
  ApplyDiscountsRequest,
  ApplyDiscountsResponse,
} from './dto';
import { DiscountsService } from './discounts.service';
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  async createDiscount(
    @Body() body: CreateDiscountRequest,
  ): Promise<CreateDiscountResponse> {
    try {
      const payload: CreateDiscountInput = {
        code: body.code,
        product: body.product,
        startTime: body.startTime,
        endTime: body.endTime,
      };
      const result = await this.discountsService.createDiscount(payload);
      return {
        success: true,
        message: `Discount with code ${body.code} has been created.`,
        data: result,
      };
    } catch (error) {
      console.error('createDiscount', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new HttpException(
          'Unable to create discount.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async cancelDiscount(
    @Param('id') id: number,
  ): Promise<CancelDiscountResponse> {
    try {
      const payload: CancelDiscountInput = {
        id: id,
      };
      const result = await this.discountsService.cancelDiscount(payload);
      return {
        success: true,
        message: `Discount with id ${id} has been cancelled.`,
        data: result,
      };
    } catch (error) {
      console.error('cancelDiscount', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Unable to cancel discount.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('apply')
  async applyDiscounts(
    @Body() body: ApplyDiscountsRequest,
  ): Promise<ApplyDiscountsResponse> {
    try {
      const payload: ApplyDiscountsInput = {
        products: body.products,
      };
      const result = await this.discountsService.applyDiscounts(payload);
      return {
        success: true,
        message: `Discounts have been applied.`,
        data: result,
      };
    } catch (error) {
      console.error('applyDiscounts', error);
      throw new HttpException(
        'Unable to apply discount.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
