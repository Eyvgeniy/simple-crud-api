const http = require('http');
const {
  getPersons,
  findByIdPerson,
  createPerson,
  updatePerson,
  removePerson,
} = require('./controllers/personsController');

const server = http.createServer((req, res) => {
  if (req.url === '/persons' && req.method === 'GET') {
    getPersons(res);
  } else if (req.url.match(/\/persons\/([a-z0-9-]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    findByIdPerson(res, id);
  } else if (req.url === '/persons' && req.method === 'POST') {
    createPerson(req, res);
  } else if (req.url.match(/\/persons\/([a-z0-9-]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];

    updatePerson(req, res, id);
  } else if (req.url.match(/\/persons\/([a-z0-9-]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];

    removePerson(req, res, id);
  } else {
    res.writeHead(404);
    res.end('The route doesn`t exist');
  }
});

module.exports = server;
