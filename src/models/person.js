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
    const newPerson = { id: uuid(), ...person };
    persons.push(newPerson);

    res(newPerson);
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

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
