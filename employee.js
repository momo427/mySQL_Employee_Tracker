const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  generalSearch();
});

const generalSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Search employee", "Search roles", "Search departments", "Add Employee", "Add Role", "Add Department", "Update Employee"],
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

        case "Add departments":
          addDepartment();
          break;

        case "Add roles":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add employee":
          addEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};



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










const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "employeefirstname",
        type: "input",
        message: "Enter employee first name",
      },
      {
        name: "employeelastname",
        type: "input",
        message: "Enter employee last name",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
.then(function (val) {
    var roleId = selectRole().indexOf(val.role) + 1
    var managerId = selectManager().indexOf(val.choice) + 1
    connection.query("INSERT INTO employee SET ?", 
    {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId
        
    }, function(err){
        if (err) throw err
        console.table(val)
        startPrompt()
    })

})
}
// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles
