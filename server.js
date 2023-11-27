
import runHealthCheck from './src/app.js';
import produceMessage from './src/kafkaproducer.js';


const main = async () => {
  try {
    let retries = 0;
    let healthCheckResult;

    do {
      healthCheckResult = await runHealthCheck();
      retries++;

      if (healthCheckResult.status !== 200 && retries < process.env.MAX_RETRIES) {
        console.log(`Health check failed. Retrying (${retries}/${process.env.MAX_RETRIES})...`);
      }
    } while (healthCheckResult.status !== 200 && retries < process.env.MAX_RETRIES);

    if (healthCheckResult.status === 200) {
      console.log('Health check passed:', healthCheckResult.details);
      await produceMessage(process.env.HEALTH_CHECK_URL, healthCheckResult.status);
    } else {
      console.error('Health check failed after retries:', healthCheckResult.details);
    }
  } catch (error) {
    process.exitcode = 1;
    console.error('Error running health check:', error);
  } finally {
    process.exit();
  }
};

main();
