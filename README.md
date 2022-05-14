# StoriCard's Code Exercise

## To DO
- [X] The summary email contains information on the total balance in the account, the number of transactions grouped by month, and the average credit and average debit amounts grouped by month. Using the transactions in the image above as an example, the summary info would be
  Total balance is 39.74
  Number of transactions in July: 2
  Number of transactions in August: 2
  Average debit amount: -15.38
  Average credit amount: 35.25
- [X] Include the file you create in CSV format.
- [X] Code is versioned in a git repository. The README.md file should describe the code interface and
instructions on how to execute the code.

-----------------------------
## OpenAPI Documentation
[View Heroku OpenAPI](https://vast-gorge-02819.herokuapp.com/docs/)

```bash
http://{{domain}}/docs/
```

## Postman Collection:
[View here](./docs/StoriCard.postman_collection.json)

## Transaction File example:
[View here](./docs/transactions-example-file.csv)

## Run test
```bash
npm test
```

## Run project
### ... with NPM
```bash
npm start
```
### ... with Docker
```bash
$ docker compose -f docker-compose.local.yml build
$ docker compose -f docker-compose.local.yml up
$ docker compose -f docker-compose.local.yml down # -> down app
```
### ... dev entorn
```bash
npm run start:dev
```
## env file
```NODE_ENV=dev
PORT=3001
MONGO_URL=mongodb+srv://<user>:<password>@<mongourl>/<databasename>?retryWrites=true&w=majority
MONGO_URL_TEST=mongodb+srv://<user>:<password>@<mongourl>/<databasenameTEST>?retryWrites=true&w=majority
BUCKET_BASE=XXXX
BUCKET_KEY=XXXX
BUCKET_SECRET=XXXX
GMAIL_USER=user@gmail.com
GMAIL_PASS=xxxxxx
```