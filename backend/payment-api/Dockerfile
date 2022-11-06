FROM node:19.0.0-alpine

WORKDIR /app
COPY . .
RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]