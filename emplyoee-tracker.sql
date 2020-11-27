DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY(department_id) REFERENCES department(id)
  PRIMARY KEY (id)
);

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

INSERT INTO employee_trackerDB.department(name) values("IT");
INSERT INTO employee_trackerDB.department(name) values("SALES");
INSERT INTO employee_trackerDB.department(name) values("ADMIN");
INSERT INTO employee_trackerDB.department(name) values("PAYROLL");

INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Software Developer",100,000,1);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Manager",150,000,2);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("HR",90,000,4);
INSERT INTO employee_trackerDB.role(title,salary,department_id) values("Tech Support",112,000,3);



INSERT INTO employee_trackerDB.employee(first_name,last_name,role_id,manager_id) values("Pam","Scott",1);
INSERT INTO employee_trackerDB.employee(first_name,last_name,role_id,manager_id) values("Sam","Lind",2,1);



SELECT * FROM department;

select * from role;
SELECT * FROM employee;


-- select employee.first_name,employee.last_name,role.title,role.salary,department.name as department , 
-- CONCAT(employee.first_name,' ' ,employee.last_name) as Manager from employee INNER JOIN role  
-- on employee.role_id = role.id INNER JOIN department on role.department_id = department.id LEFT JOIN employee manager
-- on employee.manager_id = employee.id;
