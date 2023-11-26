
import kafka from '../config/kafkaconfig.js';

const producer = kafka.producer();

const produceMessage = async (url, status, processTime) => {
  try {
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
    console.error('Error publishing to Kafka:', error);
  } finally {
    await producer.disconnect();
  }
};

export default produceMessage;



