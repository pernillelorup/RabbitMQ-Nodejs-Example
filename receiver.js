const amqp = require("amqplib/callback_api");

//Step 1: Create connection
amqp.connect("amqp://localhost", (connError, connection) => {
  if (connError) {
    throw connError;
  }
  //Step 2: Create channel
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    //Step 3: Assert queue
    const QUEUE = "codingtest";
    channel.assertQueue(QUEUE);
    //Step 4: Receive messages
    channel.consume(
      QUEUE,
      (msg) => {
        console.log(`Message received: ${msg.content}`);
      },
      {
        noAck: true, //true to close connection - false to keep it running
      }
    );
  });
});
