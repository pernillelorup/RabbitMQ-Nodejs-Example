const amqp = require('amqplib/channel_api');
const fetch = require('node-fetch');
const fs = require('fs');

const URL = 'amqp://localhost';
const GENDER_API = 'https://api.genderize.io';

async function loadPersons() {
	const data = await fs.readFileSync('src/assets/persons.json');
	return JSON.parse(data);
}

async function getGender(event) {
	const result = event.map(async (person) => {
		const response = await fetch(`${GENDER_API}/?name=${person.name}`);
		const json = await response.json();

		return { ...json, email: person.email };
	});

	return await Promise.all(result);
}

async function loadMailTemplate(event) {
	const result = event.map(async (person) => {
		const title = person.gender == 'male' ? 'mr.' : person.gender == 'female' ? 'ms.' : 'mx.';

		let mailTemplate = await fs.readFileSync('src/assets/mail.txt', 'utf-8');
		mailTemplate = mailTemplate.replace('XX', title);
		mailTemplate = mailTemplate.replace('NN', person.name);

		return { email: person.email, mail: mailTemplate };
	});

	return await Promise.all(result);
}

async function handleQueue(event) {
	// Step 1: Create connection & channel in RabbitMQ.
	const connection = await amqp.connect(URL);
	const channel = await connection.createChannel();

	await setTimeout(async () => {
		await Promise.all(
			event.map((person) => {
				const queue = person.email;

				// Step 2: Assert Queue.
				channel.assertQueue(queue);

				// Step 3: Send message to queue.
				channel.sendToQueue(queue, Buffer.from(person.mail));

				// Step 4: Logs information.
				console.log(`Message sent to ${queue}`);
			})
		);
	}, 5000);
}

module.exports = { loadPersons, loadMailTemplate, getGender, handleQueue };
