# RabbitMQ-Nodejs-Example

### Installations

**rabbitmq**

```bash

#using homebrew
brew install rabbitmq

#adding it to PATH
export PATH=$PATH:/usr/local/sbin
```

### Start RabbitMQ

```bash
brew services start rabbitmq
```

Go to [localhost:15672](http://localhost:15672/#/)

```bash
username: guest;
password: guest;
```

Go to Queues and observe the upcoming results

### Run project

Start by installing packages.
In this project I'm only using [amqplib](https://www.npmjs.com/package/amqplib)

```bash
yarn install
```

**run sender.js**

```bash
node src/sender.js
```

Go back to your RabbitMQ dashboard in the panel 'Queues' and you should see a new queue named **codingtest**. Press it and you can see an overview presenting your queued messages that has been sent.

**run receiver.js**

```bash
node src/receiver.js
```

Again, go back to RabbitMQ dashboard and see how the curve in the diagram has changed because the messages have been received.

---

When done, remember to shut down RabbitMQ with the following command

### Stop RabbitMQ

```bash
brew services stop rabbitmq
```
