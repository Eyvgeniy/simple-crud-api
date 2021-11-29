const http = require('http');
const {
  getPersons,
  findByIdPerson,
  createPerson,
  updatePerson,
  removePerson,
} = require('./controllers/personsController');
const { errorWrapper, personsRouteRegExp } = require('./utils');

const server = http.createServer((req, res) => {
  errorWrapper(req, res, () => {
    if (req.url === '/persons' && req.method === 'GET') {
      return getPersons(req, res);
    } else if (req.url.match(personsRouteRegExp) && req.method === 'GET') {
      const id = req.url.split('/')[2];
      return findByIdPerson(req, res, id);
    } else if (req.url === '/persons' && req.method === 'POST') {
      return createPerson(req, res);
    } else if (req.url.match(personsRouteRegExp) && req.method === 'PUT') {
      const id = req.url.split('/')[2];

      return updatePerson(req, res, id);
    } else if (req.url.match(personsRouteRegExp) && req.method === 'DELETE') {
      const id = req.url.split('/')[2];

      return removePerson(req, res, id);
    } else {
      res.writeHead(404);
      res.end('The route doesn`t exist');
    }
  });
});

module.exports = server;
