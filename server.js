
import runHealthCheck from './src/app.js';
import produceMessage from './src/kafkaproducer.js';


const main = async () => {
  try {
    // let retries = 0;
    // let healthCheckResult;

    const healthCheckResult = await runHealthCheck();

    // do {
    //   healthCheckResult = await runHealthCheck();
    //   retries++;

    //   if (healthCheckResult.status !== 200 && retries < process.env.MAX_RETRIES) {
    //     console.log(`Health check failed. Retrying (${retries}/${process.env.MAX_RETRIES})...`);
    //   }
    // } while (healthCheckResult.status !== 200 && retries < process.env.MAX_RETRIES);

    if (healthCheckResult.status) {
      console.info(`Health check performed for ${healthCheckResult.url} with status ${healthCheckResult.status} and process time ${healthCheckResult.processTime}ms`);
      await produceMessage(process.env.HEALTH_CHECK_URL, healthCheckResult.status);
    }

  } catch (error) {
    process.exitcode = 1;
    console.error('Error running health check:', error);
  } finally {
    process.exit();
  }
};

main();
