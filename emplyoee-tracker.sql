DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;
-- creating department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- creating role table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY(department_id) REFERENCES department(id)
  PRIMARY KEY (id)
);

-- creating employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
   FOREIGN KEY(role_id) REFERENCES role(id)
  manager_id INT,
  FOREIGN KEY(manager_id) REFERENCES employee(id)
  
  PRIMARY KEY (id)
);

-- Insertign data in department table
INSERT INTO employee_trackerDB.department(name) values("IT");
INSERT INTO employee_trackerDB.department(name) values("SALES");
INSERT INTO employee_trackerDB.department(name) values("ADMIN");
INSERT INTO employee_trackerDB.department(name) values("PAYROLL");

-- Insertign data in role table
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Software Developer",100,000,1);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Manager",150,000,2);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Lead",120000,4);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("VP",200000,3);


-- Insertign data in employee table
INSERT INTO employee_trackerDB.employee(first_name,last_name,role_id,manager_id) values("Pam","Scott",1);
INSERT INTO employee_trackerDB.employee(first_name,last_name,role_id,manager_id) values("Sam","Lind",2,34);
INSERT INTO employee_trackerDB.employee(first_name,last_name,role_id,manager_id) values("Ammu","Abothu",4,35);


-- Retrieving all records from department table
SELECT * FROM department;

-- -- Retrieving all records from role table
select * from role;

-- -- Retrieving all records from employee table
SELECT * FROM employee;



