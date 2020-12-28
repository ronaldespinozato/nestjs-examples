<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
This project was build to test the [NestJs framework](https://docs.nestjs.com/), for that some endpoints were created.
## What is using in this project?
- Create modules and use them to create endpoints
- Use Swagger module to display swagger documentation
- Use Jwt module to generate auth token
- Use typeORM module to connect and save data in Mysql
- Use Winston logger in order to create logs files and add messages
- Create endpoints to create user, user account and login into account.


It expose the following endpoints:
### Create a user
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Ronald",
    "lastName": "Espinoza",
    "ciNit": "123456789",
    "phoneNumber": "76930655"
}'
```
### Create user account
```
curl --location --request POST 'localhost:3000/auth/accounts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "{userId}",
    "userName": "ronald.espinoza",
    "password": "if(nestjs){great!}"
}'
```
### Login to get jwt token
```
curl --location --request POST 'localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{    
    "userName": "ronald.espinoza",
    "password": "if(nestjs){great!}"
}'
```

### Get a user by id
```
curl --location --request GET 'localhost:3000/users/92D304DF-7A13-48B7-BC34-F2E79BD84850'
```
### Get all users
```
curl --location --request GET 'localhost:3000/users'
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# How getting starting on Nestjs

### Install nestjs

	$  $ npm i -g @nestjs/cli

### Create project

	$  nest new nestjs-examples

### Create modules
It can be 

    $  nest g module users

### Create controller
They are responsible for handling incoming requests and returning responses to the client.

    $  nest g controller users

### Create Services
It can be services, repositories, factories, helpers, and so on.

    $  nest g service users
