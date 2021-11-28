const person1 = { id: '1', name: 'John', age: 23, hobbies: ['games', 'football'] };
const person2 = { id: '2', name: 'Masha', age: 9, hobbies: ['games', 'dances'] };
const person3 = { id: '3', name: 'Nika', age: 2, hobbies: ['eat', 'sleep'] };

const persons = [person1, person2, person3];

const findAll = () => new Promise((res, rej) => res(persons));

const findById = (id) =>
  new Promise((res, rej) => {
    const person = persons.find((p) => p.id === id);
    res(person);
  });

module.exports = {
  findAll,
  findById,
};
