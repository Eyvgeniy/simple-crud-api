const { v4: uuid } = require('uuid');

const person1 = { id: '1', name: 'John', age: 23, hobbies: ['games', 'football'] };
const person2 = { id: '2', name: 'Masha', age: 9, hobbies: ['games', 'dances'] };
const person3 = { id: '3', name: 'Nika', age: 2, hobbies: ['eat', 'sleep'] };

let persons = [person1, person2, person3];

const findAll = () => new Promise((res, rej) => res(persons));

const findById = (id) =>
  new Promise((res, rej) => {
    const person = persons.find((p) => p.id === id);

    res(person);
  });

const create = (person) =>
  new Promise((res, rej) => {
    const errors = validateParams(person);

    const newPerson = { id: uuid(), ...person };
    persons.push(newPerson);

    res([errors, newPerson]);
  });

const update = (person, id) =>
  new Promise((res, rej) => {
    const index = persons.findIndex((p) => p.id === id);
    persons[index] = { id, ...person };

    res(person[index]);
  });

const remove = (id) =>
  new Promise((res, rej) => {
    persons = persons.filter((p) => p.id !== id);

    res();
  });

const validateParams = (params) => {
  const errors = [];
  const { name, age, hobbies } = params;

  if (typeof name !== 'string') {
    errors.push('Name is required and should be string');
  }
  if (typeof age !== 'string') {
    errors.push('Age is required  and should be string');
  }

  if (!Array.isArray(hobbies)) {
    errors.push('Hobbies should be array');
  } else {
    hobbies.forEach((hobby) => {
      if (typeof hobby !== 'string') {
        errors.push('Hobby should be string');
      }
    });
  }
  return errors;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
