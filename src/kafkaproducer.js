
import kafka from '../config/kafkaconfig.js';

// Number of attempts to connect to Kafka before exiting the application
const maxRetries = 5;

const producer = kafka.producer();

// const connectWithRetries = async (producer, retriesLeft) => {
//   try {
//     await producer.connect();
//   } catch (error) {
//     if (retriesLeft > 0) {
//       console.error(`Failed to connect to Kafka. Retries left: ${retriesLeft}`);
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a short interval before retrying
//       await connectWithRetries(producer, retriesLeft - 1);
//     } else {
//       console.error('Max connection retries reached. Exiting application.');
//       process.exit(1); // Exit with an error code
//     }
//   }
// };

const produceMessage = async (url, status, processTime) => {
  try {
    // await connectWithRetries(producer, maxRetries);

    await producer.connect();

    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [
        {
          value: JSON.stringify({
            url,
            status,
            processTime,
          }),
        },
      ],
    });
    console.log('Message published to Kafka:', { url, status, processTime });
  } catch (error) {
    console.error('Error publishing to Kafka');
    await producer.disconnect();
    process.exit(1);
  } finally {
    await producer.disconnect();
    process.exit();
  }
};

export default produceMessage;



