const http = require('http');

const server = http.createServer((req, res) => {
	res.end('OK');
});

module.exports = server;
