require('dotenv').config();
const admin = require('./admin');
const consumer = require('./consumer');
const producer = require('./producer');
const websocket = require('./websocket');

// Helper to handle async initialization
const runModule = async (moduleName, initFunction) => {
  try {
    console.log(`Starting ${moduleName}...`);
    await initFunction();
    console.log(`${moduleName} is running.`);
  } catch (error) {
    console.error(`Failed to start ${moduleName}:`, error.message);
    process.exit(1); // Exit if a critical component fails
  }
};

// Main function to initialize all modules
// Track active components for cleanup
let producerInstance, consumerInstance, websocketServer;

const startApplication = async () => {
  console.log('Initializing Kafka-based image streaming application...');

  // Step 1: Create Kafka topics
  await runModule('Kafka Admin', admin.createTopics);

  // Step 2: Start the producer
  producerInstance = producer.streamNewImages(); // Keep a reference for cleanup
  console.log('Producer started.');

  // Step 3: Start the consumer for database storage
  consumerInstance = consumer.storeImageInDatabase(); // Keep a reference for cleanup
  console.log('Consumer started.');

  // Step 4: Start the WebSocket server for Flutter clients
  websocketServer = websocket.streamToFlutter(); // Keep a reference for cleanup
  console.log('WebSocket server started.');

  console.log('All components are initialized and running.');
};

// Graceful shutdown handling
process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
  
    try {
      // Disconnect the producer
      if (producerInstance && typeof producerInstance.disconnect === 'function') {
        await producerInstance.disconnect();
        console.log('Producer disconnected.');
      }
  
      // Disconnect the consumer
      if (consumerInstance && typeof consumerInstance.disconnect === 'function') {
        await consumerInstance.disconnect();
        console.log('Consumer disconnected.');
      }
  
      // Close the WebSocket server
      if (websocketServer && typeof websocketServer.close === 'function') {
        websocketServer.close();
        console.log('WebSocket server closed.');
      }
  
      console.log('Application shut down successfully.');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err.message);
      process.exit(1);
    }
});

// Start the app
startApplication();
