import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsService } from './discounts/discounts.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Discount]),
  ],
  controllers: [AppController, DiscountsController],
  providers: [AppService, DiscountsService],
})
export class AppModule {}
