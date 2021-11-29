const request = require('supertest');
const server = require('../src/app');

const personData = { name: 'john', age: '23', hobbies: ['games'] };
const personDataModify = { name: 'mary', age: '14', hobbies: ['games'] };

describe('GET /persons', function () {
  it('First script', async function () {
    let id;

    await request(server)
      .get('/persons')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });

    await request(server)
      .post('/persons')
      .send(personData)
      .set('Accept', 'application/json')
      .expect(201)
      .then((res) => {
        const { body } = res;
        id = body.id;
        expect(body.name).toBe(personData.name);
        expect(body.age).toBe(personData.age);
        expect(Array.isArray(body.hobbies)).toBeTruthy();
      });

    await request(server)
      .get(`/persons/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const person = res.body;
        expect(person.name).toBe(personData.name);
        expect(person.age).toBe(personData.age);
      });

    await request(server)
      .put(`/persons/${id}`)
      .send(personDataModify)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.name).toBe(personDataModify.name);
        expect(body.age).toBe(personDataModify.age);
        expect(Array.isArray(body.hobbies)).toBeTruthy();
      });

    await request(server)
      .delete(`/persons/${id}`)
      .send(personDataModify)
      .set('Accept', 'application/json')
      .expect(204);

    await request(server)
      .put(`/persons/${id}`)
      .send(personDataModify)
      .set('Accept', 'application/json')
      .expect(404);
  });
});
