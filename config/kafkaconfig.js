
import { Kafka, logLevel } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  // clientId: process.env.KAFKA_CLIENTID,
  brokers: [process.env.KAFKA_BROKERS],
  logLevel: logLevel.ERROR,
});

export default kafka;

