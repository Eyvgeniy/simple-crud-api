require('dotenv').config();
const server = require('./src/app');

const port = process.env.port;

server.listen(port, () => {
  console.log(`Server starts on port ${port}`);
});
