# Producer App

## Overview

 - The Producer App is a standalone tool designed to execute user-defined health checks, providing robust retry mechanisms, and publishing results in JSON format to a Kafka topic. 
 - This application is containerized for seamless deployment and integrates with a CI/CD pipeline managed by Jenkins to ensure reliable and efficient delivery.

## Prerequisites

The following prerequisites are used:

- **Docker**:  Utilized for building and pushing container images to a repository.
- **Kafka**: Access to a Kafka broker and topic for publishing health check results.
- **Configuration**: Health check configurations provided externally, utilizing Secrets and ConfigMap when running in a Kubernetes cluster.
- **Jenkins**: A Jenkins server configured with the necessary plugins and permissions for Docker builds and Kubernetes deployments.

## Configuration

Configure the application using the following environment variables:

- `HEALTH_CHECK_URL`: User-defined health check configuration.
- `KAFKA_BROKER`: Kafka broker address.
- `KAFKA_TOPIC`: Kafka topic name for publishing health check results.


Author: Naga Vaishnavi Puppala