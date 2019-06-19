import app from '../../app.js';
import request from 'supertest';
import { exportAllDeclaration } from '@babel/types';

describe('List User Groups', () => {
  test('Recieve user groups', () => {
    return request(app)
      .get('/list-user-groups')
      .then(response => {
        expect(response.ok).toBe(true);
      })
  })
})
