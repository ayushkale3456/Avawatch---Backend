const { Kafka } = require('kafkajs');
const fs = require('fs');
const { Pool } = require('pg');

const kafka = new Kafka({
  clientId: 'image-consumer',
  brokers: ['192.168.0.101:9092']
});

const consumer = kafka.consumer({ groupId: 'image-storage-group' });

const pool = new Pool({
  user: 'username',
  host: 'hostname',
  database: 'database name',
  password: 'Your service password',
  port: 11984,
  ssl: {
    ca: fs.readFileSync('./ca.pem').toString() // Path to your certificate
  }
});

async function storeImageInDatabase() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'image-storage', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const imageBuffer = message.value;

      const query = `
        INSERT INTO images (image_data) 
        VALUES ($1) 
        RETURNING id;
      `;
      await pool.query(query, [imageBuffer]);
      console.log('Image stored in database.');
    }
  });
}

storeImageInDatabase();


// Export the storeImageInDatabase function
module.exports = { storeImageInDatabase };
