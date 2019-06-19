import app from '../../app.js';
import request from 'supertest';

describe('Server ping', () => {
  test('Receive a 200 status code', () => {
    return request(app)
      .get('/ping')
      .then(response => {
        expect(response.statusCode).toBe(200)
      });
  });

  test('Recieve a pong', () => {
    return request(app)
      .get('/ping')
      .then(response => {
        expect(response.text).toBe('pong')
      });
  });
})
