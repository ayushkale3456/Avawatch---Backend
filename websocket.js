const WebSocket = require('ws');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'flutter-stream',
  brokers: ['192.168.0.101:9092']
});

const consumer = kafka.consumer({ groupId: 'image-stream-group' });

const wss = new WebSocket.Server({ port: 8080 });

async function streamToFlutter() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'image-stream', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const imageBuffer = message.value;

      // Broadcast to all connected WebSocket clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(imageBuffer);
        }
      });
    }
  });

  console.log('WebSocket server running on ws://192.168.0.106:8080');
}

streamToFlutter();


// Export the streamToFlutter function
module.exports = { streamToFlutter };
