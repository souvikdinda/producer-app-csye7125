
import runHealthCheck from './src/app.js';
import produceMessage from './src/kafkaproducer.js';


const main = async () => {
  try {

    const healthCheckResult = await runHealthCheck();

    if (healthCheckResult.status) {
      console.info(`Health check performed for ${healthCheckResult.url} with status ${healthCheckResult.status} and process time ${healthCheckResult.processTime}ms`);
      await produceMessage(process.env.HEALTH_CHECK_URL, healthCheckResult.status);
    }

  } catch (error) {
    onsole.error('Error running health check:', error);
    process.exit(1);
  } finally {
    process.exit();
  }
};

main();
