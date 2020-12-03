# employee-management-system-11.29.20

## About The Project

---

![alt text](Images/image1.PNG)

![alt text](Images/image2.PNG)

![alt text](Images/image3.PNG)

![alt text](Images/image4.PNG)

![alt text](Images/image5.PNG)

This application is about Employee Management System from Command Line Interface
This application allows user to perfome following tasks

-    View All Employees
-    View All Employees by Department
-    View All Employees by Manager
-    Add Employee
-    Remove Employee
-    Update Employee by Manager
-    Update Employee by Role

First applicatin prompts to user the following options:

-    View All Employees
-    View All Employees by Department
-    View All Employees by Manager
-    Add Employee
-    Remove Employee
-    Update Employee by Manager
-    Update Employee by Role

If user select View All Employees option,then user can able to see
all the employees with the following details(columns):

-    first_name
-    last_name
-    title
-    salary
-    department
-    Manager

If user select View All Employees by Department option,then user can able to see
all the employees for that perticular department.

If user select View All Employees by Manager option,then user can able to see
all the employees for that perticular Manager.

If user select Add Employee option,then user will be prompted with the
following questions:

-    What is employee's first-name
-    What is employee's last-name
-    What is employee's role:
     with list of role's title.
-    Select the manager for employee:
     with list of managers.

If user select Remove Employee option,then user will be prompted with the
following question:

-    Select employee do you want remove?:
     with list of employee names,after user select employee name
     from the list,then perticular employee will be deleted from
     the employee table.

If user select Update Employee by Manager option,then user will be prompted with the
following questions:

-    Select employee do you want update?:
     with list of employee names,after user select employee name
     from the list,then user will be prompted with the following
     question
-    Select manager do you want assign?:
     with list of managers.
     Then peticular employee will be update with new Manager.

If user select Update Employee by Role option,then user will be prompted with the
following questions:

-    Select employee do you want update?:
     with list of employee names,after user select employee name
     from the list,then user will be prompted with the following
     question
-    Select role do you want assign to selected employee?:
     with list of role titles.
     Then peticular employee will be update with new role.

If user select EXIT option,connection will end and
application exit.

## Implemented the following functionalities

-    View All Employees
-    View All Employees by Department
-    View All Employees by Manager
-    Add Employee
-    Remove Employee
-    Update Employee by Manager
-    Update Employee by Role

## Built With

Node modules

-    Inquirer : to prompts the user with questions

Classes and inheritance : to crete the Emplyoee's objects(Manager,Engineer,and Intern)

-    Emplyoee Class with Employee constructor
-    Manager Class extends Emplyoee class
-    Engineer Class extends Emplyoee class
-    Intern Class extends Emplyoee class

## Getting Started

To get a local copy up and running follow below steps.

## Prerequisites

None

## Installation instructions:

Clone the repo git clone git@github.com:NirmalaAbothu/team-profile-generator-11.10.20.git then open Git Bash window ,navigate to project folder then run
following commands

-    run "npm install" or "npm i"
-    run "npm run test"
-    run "node app.js"

after run the above command and answer all questions, then navigate to project folder in Visual Studio Code,you should able to see "output"folder and "team.html" and "style.css" files in "output" folder.Open the "team.html" in browser and see the Team Profile page.

## Credits

Followed the documentation about classes,inheritance and node js

## License & copyright

Copyright © 2020 Nirmala Abothu

## Project Demo Links

[Demo1](https://drive.google.com/file/d/1hBcaEDT-_XuuYgYySyMhnbGhbmTX0i42/view?usp=sharing)

[Demo2](https://drive.google.com/file/d/1urgaK02xDcrU1MrDxpNfEKZtGRKvBaIo/view?usp=sharing)

[Demo3](https://drive.google.com/file/d/1oW2YMWOI8-x2HQnKcJnojnxs79tWBAMQ/view?usp=sharing)
