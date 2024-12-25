const { Kafka } = require('kafkajs');

// Kafka Configuration
const kafka = new Kafka({
  clientId: 'kafka-admin',
  brokers: ['192.168.0.101:9092'] // Replace with your Kafka broker addresses
});

// Topics to Create
const topics = [
  { topic: 'images_to_store', numPartitions: 3, replicationFactor: 1 },
  { topic: 'images_to_app', numPartitions: 3, replicationFactor: 1 }
];

const createTopics = async () => {
  const admin = kafka.admin(); // Create an Admin client
  try {
    console.log('Connecting to Kafka...');
    await admin.connect(); // Connect to Kafka
    console.log('Connected to Kafka.');

    console.log('Creating topics...');
    const result = await admin.createTopics({
      topics: topics,
      waitForLeaders: true // Ensure the topic leaders are assigned
    });

    if (result) {
      console.log('Topics created successfully:', topics.map(t => t.topic));
    } else {
      console.log('Topics already exist or no changes made.');
    }
  } catch (error) {
    console.error('Error creating topics:', error);
  } finally {
    await admin.disconnect(); // Disconnect the Admin client
    console.log('Disconnected from Kafka.');
  }
};

// Run the function
createTopics();


// Export the createTopics function
module.exports = { createTopics };
