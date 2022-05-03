
# MMK BACKEND ASSESSMENT

This repository contains code for a backend engineer role. It contains 
two endpoints /inbound/sms and /outbound/sms that performs various functions.

The project is hosted on heroku at https://talentup-test.herokuapp.com/


## Tech Stack

**Server:** Node, Express, TypeScript

**Authentication Type:** Basic Auth

**Database:** Postgres.

**Caching:** Redis

**Testing:** Mocha and Chai
## Authors

- [@emmylexo](https://github.com/emmylexo)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`API_VERSION`

`APP_NAME`

`DATABASE_NAME`

`DATABASE_USER`

`DATABASE_HOST`

`DATABASE_PORT`

`DATABASE_PASSWORD`

`APP_KEY`

`REDIS_PORT`

`REDIS_HOST`

`REDIS_PASSWORD`

`REDIS_TIMEOUT_SECONDS`

`REDIS_RATE_LIMITER_TIMEOUT_SECONDS`

`REDIS_RATE_LIMITER_MAX_REQUEST`


## Run Locally

**Pre-requisite:** Please ensure you have redis installed and running properly
or use remote Redis connection.

Clone the project

```bash
  git clone https://github.com/emmylexo/mmk_test.git
```

Go to the project directory

```bash
  cd mmk_test
```

Install dependencies

```bash
  npm install
```

Create dist folder

```bash
  npm run build
```

Run dev script

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Endpoints Available

```Curl
  http://localhost:5000/v1/outbound/sms
  http://localhost:5000/v1/inbound/sms
```

Both Endpoints accept only POST HTTP methods with JSON data to, from, text which are required.
## Documentation

[Postman Json Collection](https://www.getpostman.com/collections/570fc84661f1484ef455)


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abengemmanuel/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/AbengImmanuel)


## License

[MIT](https://choosealicense.com/licenses/mit/)

