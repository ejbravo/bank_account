import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthDto } from './../src/auth/dto/auth.dto';

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
    return request(app.getHttpServer()).get('/').expect(200).expect('Ok');
  });

  describe('/auth API', () => {
    const mockCardId = '1234567812345678';
    const mockPin = '1234';

    it('/auth/signup (POST)', async () => {
      const mockUser: AuthDto = {
        cardId: mockCardId,
        pin: mockPin,
      };

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(mockUser)
        .expect(409);
    });

    it('/auth/signin (POST)', async () => {
      const mockUser: AuthDto = {
        cardId: mockCardId,
        pin: mockPin,
      };

      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(mockUser)
        .expect(201);
    });
  });

  describe('/movements API', () => {
    it('/movements/list (GET) without TOKEN should return UNAUTHORIZED', async () => {
      return request(app.getHttpServer()).get('/movements/list').expect(401);
    });

    it('/movements/income (POST)', () => {
      return request(app.getHttpServer())
        .post('/movements/income')
        .send({ amount: 100 })
        .expect(401);
    });

    it('/movements/withdraw (POST)', () => {
      return request(app.getHttpServer())
        .post('/movements/withdraw')
        .send({ amount: 100 })
        .expect(401);
    });
  });
});
