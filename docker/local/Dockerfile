# Build Stage
FROM node:16 as builder_stage
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "."]
RUN npm install
COPY . .

# Run Stage
FROM builder_stage as run_stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

USER node

EXPOSE 3001
CMD [ "npm", "run", "start:dev" ]
