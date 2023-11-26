FROM node:18-alpine
WORKDIR /producerapp
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]