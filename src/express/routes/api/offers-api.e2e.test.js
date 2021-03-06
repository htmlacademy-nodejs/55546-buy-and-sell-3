'use strict';

const fs = require(`fs`).promises;
const request = require(`supertest`);
const server = require(`../../index`);

describe(`Проверка REST API для работы с объявлениями`, () => {
  const FAKE_OFFER_ID = 99999;
  const FAKE_COMMENT_ID = 99999;

  let mockOffer = null;
  let REAL_OFFER_ID = null;
  let REAL_COMMENT_ID = null;

  beforeAll(async () => {
    mockOffer = JSON.parse((await fs.readFile(`mock.json`)).toString())[0];
    REAL_OFFER_ID = mockOffer.id;
    REAL_COMMENT_ID = mockOffer.comments[0].id;
  });

  test(`Получение всех предложений`, async () => {
    const res = await request(server).get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение конкретного объявления по ID`, async () => {
    const res = await request(server).get(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение несуществующего объявления`, async () => {
    const res = await request(server).get(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Создание нового объявления`, async () => {
    const res = await request(server)
    .post(`/api/offers`)
    .send(mockOffer);
    expect(res.statusCode).toBe(200);
  });

  test(`Создание нового объявления без нужных данных`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Обновление объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Обновление несуществующего объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаление объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Удаление несуществующего объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Получение списка комментариев у конкретного объявления`, async () => {
    const res = await request(server)
      .get(`/api/offers/${REAL_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение списка комментариев у несуществующего объявления`, async () => {
    const res = await request(server)
      .get(`/api/offers/${FAKE_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаляет комментарий у объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Удаляет комментарий у несуществующего объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаляет несуществующий комментарий у объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${FAKE_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Создаёт новый комментарий у объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(200);
  });

  test(`Создаёт новый комментарий у несуществующего объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${FAKE_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(400);
  });

  test(`Создаёт новый комментарий у объявления без нужных данных`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
