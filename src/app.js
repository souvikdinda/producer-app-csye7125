

import axios from 'axios';
import produceMessage from './kafkaproducer.js';

const runHealthCheck = async (url) => {
  try {
    const startTime = Date.now();
    const header = await axios.head(url);
    const endTime = Date.now();
    const processTime = endTime - startTime;

    if (header.status) {
      return { url, status: header.status, processTime };
    }
  } catch (err) {
    throw new Error(`Health check failed for ${url}. You might want to take action.`);
  }
};

const main = async () => {
  try {
    const url = process.env.HEALTH_CHECK_URL;

    const result = await runHealthCheck(url);

    console.log(`Health check passed for ${result.url} with status ${result.status} and process time ${result.processTime}ms`);

    await produceMessage(result.url, result.status, result.processTime); // Pass individual properties
  } catch (error) {
    console.error('Error running health check:', error.message);
  } finally {
    process.exit();
  }
};

export default main;
