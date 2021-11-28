const Person = require('../models/person');
const { getBody, uuidRegExp, sendWrongRequest } = require('../utils');

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
    if (!id.match(uuidRegExp)) return sendWrongRequest(res, 'Wrong id');

    const person = await Person.findById(id);
    if (person === undefined) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    console.error(error);
  }
};

const createPerson = async (req, res) => {
  const body = await getBody(req);
  const { name, age, hobbies } = JSON.parse(body);
  const personData = { name, age, hobbies };
  const [errors, newPerson] = await Person.create(personData);

  if (errors.length > 0) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: errors[0] }));
  }

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newPerson));
};

const updatePerson = async (res, req, id) => {
  try {
    if (!id.match(uuidRegExp)) return sendWrongRequest(res, 'Wrong id');

    const person = Person.findById(id);

    if (person === undefined) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }

    const body = await getBody(req);
    const { name, age, hobbies } = JSON.parse(body);
    const personData = {
      name: name || personData.name,
      age: age || personData.age,
      hobbies: hobbies || personData.hobbies,
    };
    const newPerson = await Person.update(id, personData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newPerson));
  } catch (error) {
    console.error(error);
  }
};

const removePerson = async (req, res, id) => {
  try {
    if (!id.match(uuidRegExp)) return sendWrongRequest(res, 'Wrong id');

    const person = await Person.findById(id);

    if (person === undefined) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    } else {
      await Person.remove(id);

      res.writeHead(204);
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPersons,
  findByIdPerson,
  createPerson,
  updatePerson,
  removePerson,
};
