import {
  CancelDiscountInput,
  CancelDiscountResponse,
} from './dto/cancel-discount.dto';
import {
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
} from './dto/create-discount.dto';
import { DiscountsService } from './discounts.service';
import {
  ApplyDiscountsInput,
  ApplyDiscountsRequest,
  ApplyDiscountsResponse,
} from './dto/apply-discounts.dto';

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
      const createdDiscountOutput = await this.discountsService.createDiscount(
        payload,
      );
      return {
        success: true,
        data: createdDiscountOutput,
      };
    } catch (error) {
      throw new HttpException(
        'Unable to create discount.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      const discountedResult = await this.discountsService.applyDiscounts(
        payload,
      );
      return { data: discountedResult };
    } catch (error) {
      throw new HttpException(
        'Unable to apply discount.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
