# Point of Sale Example

## Introduction
This is a simple Point of Sale system that manage tables.

The system will also generate a receipt for the customer.

## Installation
1. Clone the repository
```bash
git clone https://github.com/c0ndu17/crypto-pos.git
```
2. Run the following command to install the dependencies
```bash
npm install
npm generate:prisma
```

## Usage
1. Run the following command to start the server
```bash
npm start
```

2. Open your browser and go to `http://localhost:3000/`

3. You can now start using the system

### Seed
To seed the database with some data, run the following command. 

This shouldn't be required to start, this project is using SQLite.
```bash
npm run db:seed
```


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
[George Phillips](georgephillips22@gmail.com)
