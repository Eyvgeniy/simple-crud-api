const Person = require('../models/person');

const getPersons = async (res) => {
  try {
    const persons = await Person.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.error(error);
  }
};

const findByIdPerson = async (res, id) => {
  try {
    const person = await Person.findById(id);
    if (person === undefined) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPersons,
  findByIdPerson,
};
