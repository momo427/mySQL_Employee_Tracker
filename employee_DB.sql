-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_DB.sql;
-- Creates the "employee_db" database --
CREATE DATABASE employee_DB.sql;

-- Makes it so all of the following code will affect employee_db --
USE employee_DB.sql;

-- Creates the table "employee", "roles", and "departments" within employee_db --
CREATE TABLE employee (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30),
  role_id INTEGER(10),
  manager_id INTEGER NULL,
  FOREIGN KEY (roles_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
)
CREATE TABLE roles (
id INTEGER NOT NULL auto_increment PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 salary DECIMAL (10,2),
 department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id)

CREATE TABLE department (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
 names VARCHAR(30)
);

