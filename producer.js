// const { Kafka, Partitioners } = require('kafkajs');
// const fs = require('fs');

// const kafka = new Kafka({
//   clientId: 'image-producer',
//   brokers: ['192.168.0.106:9092'] // Replace with your Kafka broker address
// });

// const producer = kafka.producer({
//   createPartitioner: Partitioners.DefaultPartitioner, // Using the legacy partitioner
// });

// async function sendImageToKafka(imagePath) {
//   await producer.connect();

//   const imageBuffer = fs.readFileSync(imagePath);

//   // Send image to 'image-storage' topic
//   await producer.send({
//     topic: 'image-storage',
//     messages: [{ value: imageBuffer }]
//   });

//   // Also send to 'image-stream' for Flutter app
//   await producer.send({
//     topic: 'image-stream',
//     messages: [{ value: imageBuffer }]
//   });

//   await producer.disconnect();
// }

// // Replace with the path to your image
// sendImageToKafka('./img/ava.jpg');






const { Kafka, Partitioners } = require('kafkajs');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar'); // File watcher library

const kafka = new Kafka({
  clientId: 'image-producer',
  brokers: ['192.168.0.101:9092'] // Replace with your Kafka broker address
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner, // Using the legacy partitioner
});

const imgFolder = './img'; // Folder to watch
const sentFiles = new Set(); // Keep track of sent files

async function sendImageToKafka(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);

    // Send to 'image-storage' topic
    await producer.send({
      topic: 'image-storage',
      messages: [{ value: imageBuffer }]
    });

    // Send to 'image-stream' topic
    await producer.send({
      topic: 'image-stream',
      messages: [{ value: imageBuffer }]
    });

    console.log(`Image sent: ${path.basename(imagePath)}`);
  } catch (err) {
    console.error(`Failed to send image: ${err.message}`);
  }
}

async function streamNewImages() {
  await producer.connect();

  console.log(`Watching folder: ${imgFolder}`);

  // Watch for new files in the folder
  chokidar.watch(imgFolder, { ignoreInitial: true }).on('add', async (filePath) => {
    const fileName = path.basename(filePath);

    // Skip already-sent files
    if (sentFiles.has(fileName)) {
      return;
    }

    // Send the new file to Kafka
    await sendImageToKafka(filePath);
    sentFiles.add(fileName); // Mark file as sent
  });
}

// Start streaming images
streamNewImages();


// Export the streamNewImages function
module.exports = { streamNewImages };
