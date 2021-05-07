const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_DB',
});


connection.connect((err) => {
    if (err) throw err;
    employeeSearch();
  });
  

const employeeSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'Find employee by name',
          'Search roles',
          'Search departments',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Find employee by name':
            employeeSearch();
            break;
  
          case 'Search roles':
            roleSearch();
            break;
  
          case 'Search departments':
            departmentSearch();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };