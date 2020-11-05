const amqp = require('amqplib/channel_api');

const URL = 'amqp://localhost';
const QUEUE = 'myqueue';

let payload = 'rasmus';

(async () => {
	// Step 1: Create connection & channel in RabbitMQ.
	const connection = await amqp.connect(URL);
	const channel = await connection.createChannel();

	// Step 2: Assert Queue.
	channel.assertQueue(QUEUE);

	// Step 3: Send message to queue.
	channel.sendToQueue(QUEUE, Buffer.from(payload));

	// Step 4: Logs information.
	console.log(`Message send ${QUEUE}`);
})();
