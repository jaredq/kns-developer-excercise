import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ScanInput, ScanRequest, ScanResponse } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('scan')
  async scan(@Body() body: ScanRequest): Promise<ScanResponse> {
    try {
      const payload: ScanInput = {
        products: body.products,
      };
      const result = await this.appService.scan(payload);
      return {
        success: true,
        message: `Prices and discounts have been applied.`,
        data: result,
      };
    } catch (error) {
      console.error('scan', error);
      throw new HttpException(
        'Unable to scan for prices and discounts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
