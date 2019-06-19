import app from '../../app.js';
import request from 'supertest';

describe('List users from a group', () => {
  test('Return a group\'s users if the group exists', () => {
    return request(app)
      .get('/list-group-users/SJ1KAQA56')
      .then(response => {
        expect(response.ok).toBe(true)
        // .done();
      })
  });

  test('Return a 404 status code if group does not exist', () => {
    // expect.assertions(1)
    return request(app)
      .get('/list-group-users/noGroup')
      .then(response => {
        expect(response.statusCode).toBe(404)
      });
  });

  test('Return a false `ok` property if group does not exist', () => {
    // expect.assertions(1)
    return request(app)
      .get('/list-group-users/noGroup')
      .then(response => {
        expect(response.ok).toBe(false)
      });
  });

  test('Recieve a message and error if group does not exist', () => {
    return request(app)
      .get('/list-group-users/noGroup')
      .then(response => {
        expect(response.text).toBe('Group not found')
      });
  });
});
