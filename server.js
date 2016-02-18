const config = require('./config.json');
const redis = require('redis');
const client = redis.createClient({
	host: config.host,
	port: config.port,
	auth_pass: config.auth_pass,
});

const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-new-cap
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname + '/public' }); // eslint-disable-prefer-template
});

// serves up css and js etc. from public folder
app.use(express.static('public'));

io.on('connection', (socket) => {
	client.get('on:off', (err, reply) => {
		console.log(`Light state is ${reply}`);
		io.emit('bg change', reply);
	});

	socket.on('lights on', () => {
		console.log('Turn on the lights');

		client.set('on:off', 'on', (err, reply) => {
			console.log(reply);
		});

		client.get('on:off', (err, reply) => {
			console.log(`Light state is ${reply}`);
			io.emit('bg change', reply);
		});
	});

	socket.on('lights off', () => {
		console.log('Turn the lights off');

		client.set('on:off', 'off', (err, reply) => {
			console.log(reply);
		});

		client.get('on:off', (err, reply) => {
			console.log(`Light state is ${reply}`);
			io.emit('bg change', reply);
		});
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
