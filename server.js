const config = require('./config.json');
const redis = require('redis');
const client = redis.createClient({
	host: config.host,
	port: config.port,
	auth_pass: config.auth_pass,
});

const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);
const port = 3000;

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from './routes';

app.use(express.static('public'));

app.set('view engine', 'ejs');

let state = '';
client.get('on:off', (error, reply) => {
	// console.log(`Initial Light State is ${reply}`);
	state = reply;
	return state;
});

app.get('*', (req, res) => {
	// routes is our object of React routes defined above
	match({ routes, location: req.url }, (err, redirectLocation, props) => {
		if (err) {
			// something went badly wrong, so 500 with a message
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			// we matched a ReactRouter redirect, so redirect from the server
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (props) {
			// if we got props, that means we found a valid component to render
			// for the given route
			const markup = renderToString(<RouterContext {...props} />);
			let stateClass = '';

			console.log(`this is the state: ${state}`);
			if (state === 'on') {
				stateClass = 'class="body--on"';
			} else {
				stateClass = 'class="body--off"';
			}
			// render `index.ejs`, but pass in the markup we want it to display
			res.render('index', { markup, stateClass });
		} else {
			// no route match, so 404. In a real app you might render a custom
			// 404 view here
			res.sendStatus(404);
		}
	});
});



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

http.listen(port, () => {
	console.log(`listening on *:${port}`);
});
