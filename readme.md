## Installation

Download the project and run npm install in main project directory

```bash
npm install
```

## Usage

To start project use npm start and server can be used on http://localhost:3000/

```python
npm start
```

To run tests use npm run test in project main folder and test will run

```python
npm run test
```

Use the following routes to access data on localhost

```python
POST     http://localhost:3000/api/v1.0.0/users/login           User login (username: user1, password: user1), user2, user3 

GET      http://localhost:3000/api/v1.0.0/lists                 Get all user lists

GET      http://localhost:3000/api/v1.0.0/lists/:listId/items   Get all list items
POST     http://localhost:3000/api/v1.0.0/lists/:listId/items   Add list item
PUT      http://localhost:3000/api/v1.0.0/lists/:listId/items   Edit list item
DELETE   http://localhost:3000/api/v1.0.0/lists/:listId/items   Delete list item
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
