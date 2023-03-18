import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountHalfPriceProcessor } from './processors/discount-halfprice.processor';
import { Discount2For3Processor } from './processors/discount-2for3.processor';
import { DiscountBuy1Get1HalfPriceProcessor } from './processors/discount-buy1get1halfprice.processor';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsService } from './discounts/discounts.service';
import { DiscountProcessorMap } from './processors/discount.processor.map';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // set to false for production
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Discount]),
  ],
  controllers: [AppController, DiscountsController],
  providers: [
    AppService,
    DiscountsService,
    DiscountProcessorMap,
    DiscountHalfPriceProcessor,
    Discount2For3Processor,
    DiscountBuy1Get1HalfPriceProcessor,
  ],
})
export class AppModule {}
