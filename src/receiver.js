// libraries
const amqp = require('amqplib/channel_api');
const fetch = require('node-fetch');
const eip = require('eip');
const fs = require('fs');

// ...
const GENDER_API = 'https://api.genderize.io';

const URL = 'amqp://localhost';
const QUEUE = 'myqueue';
// const QUEUE_B = 'testcoding';

async function loadPersons(event) {
	const data = fs.readFileSync('src/assets/persons.json');
	const json = JSON.parse(data);

	return json[event.content] || { error: `Name (${event.content}) not found` };
}

async function loadMailTemplate(event) {
	if (event.error) return event;

	let mailTemplate = await fs.readFileSync('src/assets/mail.txt', 'utf-8');

	const title = event.gender == 'male' ? 'mr.' : event.gender == 'female' ? 'ms.' : 'mx.';

	mailTemplate = mailTemplate.replace('XX', title);
	mailTemplate = mailTemplate.replace('NN', event.name);

	return { email: event.email, mail: mailTemplate };
}

async function getGender(event) {
	if (event.error) return event;

	const response = await fetch(`${GENDER_API}/?name=${event.name}`);
	const json = await response.json();

	return { ...json, email: event.email };
}

async function processHandler(msg) {
	// route
	const route = new eip.Route('myRoute', { route: { retryLimit: 3, retryDelay: 1000 }, isErrorRoute: false }, []);

	// process / filter
	route.process(loadPersons);
	route.process(getGender);
	route.process(loadMailTemplate).info();

	// event injection
	route.inject(msg);
}

// ...
(async () => {
	// Step 1: Create connection & channel in RabbitMQ.
	const connection = await amqp.connect(URL);
	const channel = await connection.createChannel();

	// Step 2: Assert Queue.
	channel.assertQueue(QUEUE);

	// Step 4:
	channel.consume(QUEUE, processHandler, { noAck: true });
})();
