const Person = require('../models/person');
const { getBody, uuidRegExp, sendWrongRequest } = require('../utils');

const getPersons = async (req, res) => {
  const persons = await Person.findAll();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(persons));
};

const findByIdPerson = async (req, res, id) => {
  if (!id.match(uuidRegExp)) return sendWrongRequest(res, 'Wrong id');

  const person = await Person.findById(id);
  if (person === undefined) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Person not found' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(person));
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

const updatePerson = async (req, res, id) => {
  if (!id.match(uuidRegExp)) return sendWrongRequest(res, 'Wrong id');

  const person = await Person.findById(id);

  if (person === undefined) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Person not found' }));
    return;
  }

  const body = await getBody(req);
  const { name, age, hobbies } = JSON.parse(body);
  const personData = {
    name: name || personData.name,
    age: age || personData.age,
    hobbies: hobbies || personData.hobbies,
  };
  const newPerson = await Person.update(personData, id);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newPerson));
};

const removePerson = async (req, res, id) => {
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
};

module.exports = {
  getPersons,
  findByIdPerson,
  createPerson,
  updatePerson,
  removePerson,
};
