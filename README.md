# Sleep Tracker API

This is a simple RESTful API for tracking sleep records, built with Node.js, Express, and Mocha for testing.

## Setup and Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/sleep-tracker-api.git
    cd sleep-tracker-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Running the API

1. **Start the API server:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

2. **Run tests:**

    ```bash
    npm test
    ```

## API Endpoints

### Create a Sleep Record

```bash
curl -X POST http://localhost:3000/sleep -H "Content-Type: application/json" -d '{
  "userId": "user1",
  "hours": 8,
  "timestamp": "2023-05-20T10:00:00.000Z"
}'
```

#### Correct response

```bash
{
  "id": "unique-record-id",
  "userId": "user1",
  "hours": 8,
  "timestamp": "2023-05-20T10:00:00.000Z"
}
```
#### Error Handling - userId is empty or hours is empty

```bash
{
  "error": "userId is required"
}
```

```bash
{
  "error": "hours is required"
}
```

### Retrieving Sleep Records for a User

```bash
curl -X GET http://localhost:3000/sleep/user1
```

#### Correct response

```bash
{
  "id":"a381099f-52e6-428f-9313-31e74eae262c",
  "userId":"user1",
  "hours":8,
  "timestamp":"2023-05-20T10:00:00.000Z"
}
```

#### Error Handling - userId is not present

```bash
{
  "error": "User not found"
}
```

### Deleting a Sleep Record

```bash
curl -X DELETE http://localhost:3000/sleep/a381099f-52e6-428f-9313-31e74eae262c
```

#### Correct response

```bash
{
  "message" : "Record deleted successfully"
}
```

#### Error Handling - invalid userId as input

```bash
{
  "error" : "Record not found"
}
```

## Testing using Mocha framework - successful operations and common error scenarios

### Tests are written in tests/sleep.test.js

```bash
Sleep Tracker API
    ✔ should create a new sleep record
    ✔ should retrieve sleep records for a user
    ✔ should delete a sleep record
    ✔ should return 400 Bad Request if userId is missing in create sleep record request
    ✔ should return 400 Bad Request if hours is missing in create sleep record request
    ✔ should return 404 Not Found if trying to retrieve sleep records for non-existing user
    ✔ should return 404 Not Found if trying to delete a non-existing sleep record
```
