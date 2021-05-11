const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");



const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  generalSearch();
});

const generalSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Search employee", "Search roles", "Search departments", "Add Employee", "Add Role", "Add Departments", "Update Employee"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Search employee":
          employeeQuery();
          break;

        case "Search roles":
          roleQuery();
          break;

        case "Search departments":
          departmentQuery();
          break;

        case "Add Departments":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// View departments, roles, employees

const employeeQuery = () => {
    let query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.log(`EMPLOYEES:`)
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        })
        generalSearch();
        });
    };

    const departmentQuery = () => {
        let query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            console.log(`DEPARTMENTS:`)
          res.forEach(department => {
              console.log(`ID: ${department.id} | Name: ${department.name}`)
          })
          generalSearch();
          });
      };

      const roleQuery = () => {
        var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
            console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        generalSearch();
        });
    };




// Add departments, roles, employees

const addDepartment = () => {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
        })
        .then(function(answer){
    let query = "INSERT INTO department (name) VALUE (?)";
    connection.query (query, answer.department, function(err,res){
        console.log("You have successfully added a new department")
    })
    generalSearch();
})
}

const addRole = () => {
    inquirer
        .prompt([
            {
            name: "Role_title",
            type: "input",
            message: "What is the name of the role you would like to add?"
        },
        {
            name: "Role_salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "Role_Department_ID",
            type: "input",
            message: "What department is this role under?"
        }
    ])
        .then(function(answer){
            let query = "INSERT INTO role (title, salary, department_id) VALUE (?,?,?)";
            connection.query(query, [answer.Role_title, answer.Role_salary, answer.Role_Department_ID], function(err,res){
                console.log("You have successfully added a new role")
            })
            generalSearch();
        })
}

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What's the first name of the employee?",
            name: "employeeFirstName"
          },
          {
            type: "input",
            message: "What's the last name of the employee?",
            name: "employeeLastName"
          },
          {
            type: "input",
            message: "What is the employee's role id number?",
            name: "roleID"
          },
          {
            type: "input",
            message: "What is the manager id number?",
            name: "managerID"
          }
    ])
    .then(function(answer){
        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)";
        connection.query(query, [answer.employeeFirstName, answer.employeeLastName, answer.roleID, answer.managerID], function(err,res){
            console.log("You have successfully added a new employee")
        })
        generalSearch();
    })
}


// Update employee 

function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "employeeUpdate"
        },
  
        {
          type: "input",
          message: "What is this employees new role?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
        let query = 'UPDATE employee SET role_id=? WHERE first_name= ?'
        connection.query(query,[answer.updateRole, answer.employeeUpdate],function(err, res) {
            console.log("You have successfully updated an employee")  
        });
        generalSearch();
      });
  }
