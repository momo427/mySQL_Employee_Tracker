-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_DB;
-- Creates the "employee_db" database --
CREATE DATABASE employee_DB;

-- Makes it so all of the following code will affect employee_db --
USE employee_DB;

-- Creates the table "employee", "roles", and "departments" within employee_db --
CREATE TABLE department (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
 names VARCHAR(30)
);
CREATE TABLE roles (
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
  roles_id INTEGER,
  manager_id INTEGER NULL,
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES roles(id)
);


