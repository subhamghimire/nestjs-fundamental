import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../../src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffees', () => {
  let app: INestApplication;

  const coffee = {
    name: 'Capuchino',
    brand: 'nestle',
    flavors: ['chocolate', 'vanilla'],
  };

  const updateCoffee = {
    name: 'latte',
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);
  });
  it('Get all [GET /]', () => {
    return request(app.getHttpServer()).get('/coffees').expect(HttpStatus.OK);
  });
  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer()).get(`/coffees/1`).expect(HttpStatus.OK);
  });
  it('Upate one [PATCH /:id]', () => {
    return request(app.getHttpServer())
      .patch('/coffees/1')
      .send(updateCoffee as UpdateCoffeeDto)
      .expect(HttpStatus.OK);
  });
  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('coffees/1')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
