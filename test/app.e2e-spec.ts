import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('KNS Pricing and Discounting Service');
  });

  it('/scan (POST)', async () => {
    const excepted = {
      success: true,
      message: 'Prices and discounts have been applied.',
      data: {
        products: [
          {
            name: 'apple',
            price: 50,
            resultedPrice: 50,
          },
          {
            name: 'banana',
            price: 40,
            resultedPrice: 0,
            discountCode: '2for3',
          },
          {
            name: 'banana',
            price: 40,
            resultedPrice: 40,
          },
          {
            name: 'potato',
            price: 26,
            resultedPrice: 26,
          },
          {
            name: 'tomato',
            price: 30,
            resultedPrice: 30,
          },
          {
            name: 'banana',
            price: 40,
            resultedPrice: 40,
          },
          {
            name: 'potato',
            price: 26,
            resultedPrice: 13,
            discountCode: 'buy1get1halfprice',
          },
        ],
        totalPrice: 199,
      },
    };

    const body = {
      products: [
        'apple',
        'banana',
        'banana',
        'potato',
        'tomato',
        'banana',
        'potato',
      ],
    };
    const response = await request(app.getHttpServer())
      .post('/scan')
      .send(body)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(excepted);
  });
});
