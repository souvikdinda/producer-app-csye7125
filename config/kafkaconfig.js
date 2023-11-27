
import { Kafka, logLevel } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafkaBrokers = process.env.KAFKA_BROKERS.split(',');


const kafka = new Kafka({
  // clientId: process.env.KAFKA_CLIENTID,
  brokers: kafkaBrokers,
  logLevel: logLevel.ERROR,
});

export default kafka;

