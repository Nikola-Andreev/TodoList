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
POST     http://localhost:3000/api/v1.0.0/users/login             User login (username: admin, password: admin)

GET      http://localhost:3000/api/v1.0.0/products                Get all products
POST     http://localhost:3000/api/v1.0.0/products                Add product
PUT      http://localhost:3000/api/v1.0.0/products/:productId     Edit product
DELETE   http://localhost:3000/api/v1.0.0/products/:productId     Delete product

GET      http://localhost:3000/api/v1.0.0/orders                  Get all orders
POST     http://localhost:3000/api/v1.0.0/orders                  Add order
PUT      http://localhost:3000/api/v1.0.0/orders/:productId       Edit order
```

## License
[MIT](https://choosealicense.com/licenses/mit/)