// libraries
const amqp = require('amqplib/channel_api');

// ...
const URL = 'amqp://localhost';
const QUEUE = process.argv[2];

console.log(`listening on ${QUEUE}`);

//
function callback(msg) {
	const content = Buffer.from(msg.content).toString();
	console.log(content);
}

// ...
(async () => {
	// Step 1: Create connection & channel in RabbitMQ.
	const connection = await amqp.connect(URL);
	const channel = await connection.createChannel();

	// Step 2: Assert Queue.
	channel.assertQueue(QUEUE);

	// Step 4:
	channel.consume(QUEUE, callback, { noAck: true });
})();
