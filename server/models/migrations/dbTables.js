import pool from '../database';

class TableMigrations {



  static createRequestTables(request, response) {
    // const dropTAble = 'DROP TABLE IF EXIST requests CASCADE;'
    const createTable =
    'CREATE TABLE requests' +
'(' +
    'id serial NOT NULL,' +
    'user_id integer,' +
    'item character(50),' +
    'request_type character(50),' +
    'request_description character(250),' +
    'status character(100),' +
    'PRIMARY KEY (id)' +
')';

    pool.connect((err, client) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(createTable)
        .then(result => response.status(200).json({ message: 'Table has been successfully created', result: result }))
        .catch()
    });

  }
  static createUserTables(request, response) {

    const createUser = 
    'CREATE TABLE users' +
'(' +
    'id serial NOT NULL,' +
    'username character(100),' +
    'email character(100),' +
    'password character(150),' +
    'role character(100),'+
    'PRIMARY KEY (id)' +
')'


    pool.connect((err, client) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(createUser)
        .then(result => response.status(200).json({ message: 'Table has been created', result: result }))
        .catch()
    });

  }
  static checkConnection(request, response) {
    pool.connect((err) => {
      if (!err) {
        return response.status(200).json({ message: 'DataBase Connected!' });
      }
      return err;
    })
  }
  static drop(request, response) {
    const drop = 'DROP TABLE users, requests';
    pool.connect((err, client) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(drop)
        .then(result => response.status(200).json({ message: 'Table has been deleted', result: result }))
        .catch()
    });

  }
}
export default TableMigrations;
