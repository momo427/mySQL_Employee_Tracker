-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_DB;
-- Creates the "employee_db" database --  
CREATE DATABASE employee_DB;

-- Makes it so all of the following code will affect employee_db --
USE employee_DB;

-- Creates the table "employee", "roles", and "departments" within employee_db --
CREATE TABLE department (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
 name VARCHAR(30)
);
CREATE TABLE role (
id INTEGER NOT NULL auto_increment PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 salary DECIMAL (10,2),
 department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30),
  role_id INTEGER,
  manager_id INTEGER NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);


-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jessica", "Haze", null, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tiffany", "Patric", null, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mia","Lam",null,3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bently", "Lao", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Chris", "Melby", 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jason", "Baker", 1, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tom", "Nice", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;