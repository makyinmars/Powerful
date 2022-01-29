# Powerful

Powerful is the simplest and most intuitive workout experience.

## Front End

- NextJs
- Redux Toolkit
- Redux Toolkit Query
- Tailwind

## Back End

- Prisma
- Express
- TypeScript
- PostgreSQL
- JWT
- Cookie Parser

# Powerful REST API

## Version: 1.0.0

### Regiter User

POST /api/user/register

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Login User

POST /api/user/login

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get User By Id

GET /api/user/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Edit User By Id

PUT /api/user/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Delete User By Id

DELETE /api/user/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Users

GET /api/user

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Create A Workout

POST /api/workout

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

#### Get Workouts

GET /api/workout

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Workout By Id

GET /api/workout/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Update Workout By Id

PUT /api/workout/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

#### Delete Workout By Id

DELETE /api/workout/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get User Workout By User Id

GET /api/workout/user/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Create Exercise

POST /api/exercise

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Get Exercises

GET /api/exercise

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Exercise By Id

GET /api/exercise/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Update Exercise By Id

PUT /api/exercise/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

#### DELETE Exercise By Id

DELETE /api/exercise/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Exercises by Workout Id

GET /api/exercise/workout/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Create Set

POST /api/set

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Get Sets

GET /api/set

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Set By Id

GET /api/set/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Edit Set By Id

PUT /api/set/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Delete Set By Id

DELETE /api/set/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

### Get Sets By Exercise Id

GET /api/set/exercise/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Create Progress

POST /api/progress

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Get All Progress

GET /api/progress
Admin Restricted

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Get Progress By Id

GET /api/progress/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

#### Edit Progress By Id

PUT /api/progres/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Delete Progress By Id

DELETE /api/progress/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Get Progress By User Id

GET /api/progress/user/:id

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Successful response |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |
