const getBody = (req) =>
  new Promise((res, rej) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        res(body);
      });
    } catch (error) {
      rej(error);
    }
  });

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/i;

const personsRouteRegExp = /\/persons\/([a-z0-9-]+)/;

const sendWrongRequest = (res, error = 'Wrong request') => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: error }));
};

const errorWrapper = async (req, res, func) => {
  try {
    await func();
  } catch (error) {
    console.error(error);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Something went wrong' }));
  }
};

module.exports = {
  getBody,
  uuidRegExp,
  sendWrongRequest,
  errorWrapper,
  personsRouteRegExp,
};
