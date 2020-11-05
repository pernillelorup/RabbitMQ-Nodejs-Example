const eip = require('eip');
const { Timer } = require('eip-rabbit');
const { Rabbit } = require('rabbit-queue');
const fetch = require('node-fetch');

//
const url = 'amqp://localhost';
// const rabbit = new Rabbit(url, { scheduledPublish: true }); // scheduledPublish must be enabled
// const timer = new Timer([1000, 5000], rabbit, 'timer'); // delays in ms

// const route = new eip.Route();
// route.aggregate({ timer });

// route
const route = new eip.Route('myRoute', { route: { retryLimit: 3, retryDelay: 1000 }, isErrorRoute: false }, []);

// process / filter
route
	.process(async (event) => {
		const api = 'https://api.genderize.io';

		const response = await fetch(`${api}/?name=${event}`);
		const json = await response.json();

		return json;
	})
	.info();

route.process((event) => (event.gender == 'male' ? 'mr.' : event.gender == 'female' ? 'ms.' : 'mx.')).info();
// route.process((event) => 'test:: ' + event * 2).info();

// event injection
route.inject('1233');
route.inject('pernille');
route.inject('rasmus');
route.inject('stephan');
