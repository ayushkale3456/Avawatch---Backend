# Avawatch - Avalanche Prediction and Live Tracking

Avawatch is a predictive system designed to monitor avalanche zones in real-time. The project leverages machine learning, geospatial databases, and Flutter to provide live updates to users.

## Project Overview
- **Stage 1**: Process avalanche zone images using a predictive model.
- **Stage 2**: Store processed images in a PostGIS-enabled database.
- **Stage 3**: Stream data to a Flutter app, updating the live map.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js 16+**
- **PostgreSQL with PostGIS extension**
- **Docker** (for Kafka and Zookeeper)
- **Flutter**
- **Kafka (confluentinc/cp-kafka)**

### Project Setup

1. **Clone the repository:**
```bash
 git clone https://github.com/your-username/avawatch.git
 cd avawatch
```

2. **Install required Node.js modules:**
```bash
 npm install pg fs kafkajs
 npm install chokidar path
 npm install ws
```

3. **Setup the PostgreSQL/PostGIS database:**
```sql
 CREATE DATABASE avawatch_db;
 
 -- Connect to DB and enable PostGIS extension
 
 CREATE EXTENSION postgis;
```

4. **Start Kafka and Zookeeper (Docker):**
- *Start Zookeper Container and expose PORT 2181.*
```bash
docker run -p 2181:2181 zookeeper
```
- *Start Kafka Container, expose PORT 9092 and setup ENV variables.*
```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

---

## Running the Project

1. **Start Data Processing (Stage 1):**
```bash
 node src/processImages.js
```

2. **Stream Data to Database (Stage 2):**
```bash
 node src/streamToDb.js
```

3. **Send Data to Flutter App (Stage 3):**
```bash
 node src/sendToFlutter.js
```

4. **Run Flutter App:**
```bash
 cd flutter_app
 flutter run
```

---


## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License
This project is licensed under the MIT License.

