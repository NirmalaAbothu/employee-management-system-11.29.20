var mysql = require("mysql");
var inquirer = require("inquirer");
const fs = require("fs");
const table = require("console.table");
const { title } = require("process");
const { Console } = require("console");

var connection = mysql.createConnection({
     host: "localhost",

     // Your port; if not 3306
     port: 3306,

     // Your username
     user: "root",

     // Your password
     password: "1Asamuel",
     database: "employee_trackerDB",
});

connection.connect(function (err) {
     if (err) throw err;
});

function runEmployeeTracker() {
     inquirer
          .prompt([
               {
                    name: "action",
                    type: "list",
                    message: "What would you like to do?",
                    choices: [
                         "View All Employees",
                         "View All Employees by Department",
                         "View All Employees by Manager",
                         "Add Employee",
                         "Remove Employee",
                         "Update Employee by Manager",
                         "Update Employee by Role",
                    ],
               },
          ])
          .then((response) => {
               const action = response.action;
               switch (action) {
                    case "View All Employees":
                         //console.log("employees");
                         viewAllEmployees();

                         break;

                    case "View All Employees by Department":
                         console.log("employees");
                         viewAllEmployeesByDepartment();
                         break;

                    case "View All Employees by Manager":
                         console.log("employees");
                         viewAllEmployeesByManager();
                         break;
                    case "Add Employee":
                         console.log("employees");
                         addEmployee();
                         break;
                    case "Remove Employee":
                         removeEmployee();
                         break;

                    case "Update Employee by Manager":
                         updateEmployeeByManager();
                         break;
                    case "Update Employee by Role":
                         updateEmployeeByRole();
                         break;
                    default:
                         break;
               }
          });
}

//function
function viewAllEmployees() {
     connection.query(
          "select e.first_name,e.last_name,role.title,role.salary,department.name as department ," +
               "CONCAT(m.first_name,' ' ,m.last_name) as Manager from employee e LEFT JOIN  " +
               "employee m ON e.manager_id=m.id INNER JOIN role ON e.role_id = role.id INNER JOIN  " +
               "department ON role.department_id = department.id;",
          function (err, res) {
               if (err) throw err;
               console.log(res);
               console.table(res);
               runEmployeeTracker();
          }
     );
}

//function

function viewAllEmployees1() {
     connection.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department," +
               "CONCAT(employee.first_name, ' ',employee.last_name)AS manager FROM employee INNER JOIN role  " +
               "on employee.role_id = role.id INNER JOIN department on role.department_id = department.id LEFT JOIN employee manager " +
               "on employee.manager_id = employee.id;",
          function (err, res) {
               if (err) throw err;
               console.log(res);
               console.table(res);
               runEmployeeTracker();
          }
     );
}

//function to add employee role to array;
var roleArray = [];

function listOfRoles() {
     connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
               roleArray.push(res[i].title);
               // console.log("This is test");
               // console.log(res[i].id);
               // console.log(res[i].title);
          }
     });
     // console.log("This is Role array:");
     // console.log(roleArray);
     return roleArray;
}

//

//function to add employee managers to array;
var managerArray = [];
function listOfManagers() {
     console.log("Before");
     connection.query(
          "SELECT e.first_name,e.last_name from employee e INNER JOIN employee m ON e.manager_id=m.id",
          function (err, res) {
               if (err) throw err;
               for (let i = 0; i < res.length; i++) {
                    managerArray.push(res[i].Manager);
               }
          }
     );
     console.log("After");
     return managerArray;
}

//function list of employees
// exports.employeeArray = employeeArray;

function listOfEmployees() {
     var employeeNames = [];
     var employeeArray = [];
     return connection.query(
          "SELECT CONCAT(e.first_name,' ' ,e.last_name) as employeeName from employee e ",
          function (err, res) {
               if (err) throw err;
               console.log("employee list:");
               console.log(res);
               for (var i = 0; i < res.length; i++) {
                    // console.log(res[i].employeeName);
                    employeeArray.push(res[i].employeeName);
                    // console.log("This is final array");
                    // console.log(employeeArray);
               }
               setValue(employeeArray);
          }
     );

     function setValue(value) {
          empployeeNames = value;
          console.log(employeeNames);
     }
}

//add employee
function addEmployee() {
     connection.query("SELECT * FROM role", function (err, results) {
          if (err) throw err;
          inquirer
               .prompt([
                    {
                         type: "input",
                         name: "first_name",
                         message: "What is employee's first-name",
                    },
                    {
                         type: "input",
                         name: "last_name",
                         message: "What is employee's last-name",
                    },
                    {
                         type: "list",
                         name: "employeeRole",

                         choices: function () {
                              var choiceArray = [];
                              for (var i = 0; i < results.length; i++) {
                                   choiceArray.push(results[i].title);
                              }
                              return choiceArray;
                         },
                         message: "What is employee's role?",
                    },
                    // {
                    //      type: "list",
                    //      name: "employeeManager",
                    //      message: "What is employee's manager?",
                    //      choices: listOfManagers(),
                    // },
               ])
               .then(function (answer) {
                    var roleId;
                    for (var i = 0; i < results.length; i++) {
                         if (results[i].title === answer.employeeRole) {
                              roleId = results[i].id;
                         }
                    }

                    connection.query(
                         "INSERT INTO employee SET ?",

                         {
                              first_name: answer.first_name,

                              last_name: answer.last_name,

                              role_id: roleId,
                         },

                         function (err) {
                              if (err) throw err;
                              console.log(
                                   "Employe record inserted successfully"
                              );
                         }
                    );
               });
     });
}

function viewAllEmployeesByDepartment() {
     //

     connection.query("SELECT name FROM department", function (err, results) {
          if (err) throw err;
          inquirer
               .prompt([
                    {
                         type: "list",
                         name: "departmentName",

                         choices: function () {
                              var choiceArray = [];
                              for (var i = 0; i < results.length; i++) {
                                   choiceArray.push(results[i].name);
                              }

                              return choiceArray;
                         },
                         message:
                              "On which department do you want view all employees?",
                    },
               ])
               .then(function (answer) {
                    var depName;
                    for (var i = 0; i < results.length; i++) {
                         if (results[i].name === answer.departmentName) {
                              depName = results[i].name;
                              // console.log("department");
                              // console.log(depName);
                         }
                    }
                    var query =
                         "select e.first_name,e.last_name,role.title,role.salary,department.name as department ," +
                         "CONCAT(m.first_name,' ' ,m.last_name) as Manager from employee e LEFT JOIN  " +
                         "employee m ON e.manager_id=m.id INNER JOIN role ON e.role_id = role.id INNER JOIN  " +
                         "department ON role.department_id = department.id WHERE department.name = ?";

                    connection.query(query, [depName], function (err, res) {
                         if (err) throw err;
                         // console.log(res);
                         console.table(res);
                         runEmployeeTracker();
                    });
               });
     });
}

function viewAllEmployeesByManager() {
     let query =
          "SELECT DISTINCT m.id, CONCAT(m.first_name,' ' ,m.last_name) as Manager from employee e INNER JOIN  employee m ON e.manager_id=m.id";
     connection.query(query, function (err, results) {
          if (err) throw err;
          inquirer
               .prompt([
                    {
                         type: "list",
                         name: "managerName",

                         choices: function () {
                              var choiceArray = [];
                              for (var i = 0; i < results.length; i++) {
                                   choiceArray.push(results[i].Manager);
                              }
                              console.log(choiceArray);

                              return choiceArray;
                         },
                         message:
                              "For which manager do you want view all employees?",
                    },
               ])
               .then(function (answer) {
                    let managerId;
                    console.log("results");
                    console.log(results);
                    for (var i = 0; i < results.length; i++) {
                         if (results[i].Manager === answer.managerName) {
                              managerId = results[i].id;
                              console.log("Manager");
                              console.log(managerId);
                         }
                    }
                    var query =
                         "select e.first_name,e.last_name,role.title,role.salary,department.name as department ," +
                         "CONCAT(m.first_name,' ' ,m.last_name) as Manager from employee e LEFT JOIN  " +
                         "employee m ON e.manager_id=m.id INNER JOIN role ON e.role_id = role.id INNER JOIN  " +
                         "department ON role.department_id = department.id WHERE e.manager_id = ?";

                    connection.query(query, [managerId], function (err, res) {
                         if (err) throw err;
                         // console.log(res);
                         console.table(res);
                         runEmployeeTracker();
                    });
               });
     });
}

// v

//

function removeEmployee() {
     connection.query(
          "SELECT CONCAT(e.first_name,' ' ,e.last_name) as employeeName from employee e ",
          function (err, res) {
               if (err) throw err;
               inquirer
                    .prompt([
                         {
                              type: "list",
                              name: "employeeName",

                              choices: function () {
                                   var choiceArray = [];
                                   for (var i = 0; i < res.length; i++) {
                                        choiceArray.push(res[i].employeeName);
                                   }
                                   return choiceArray;
                              },
                              message: "Which employee do you want remove?",
                         },
                    ])
                    .then(function (answer) {
                         // get the information of the chosen list
                         var empName;
                         for (var i = 0; i < res.length; i++) {
                              if (res[i].employeeName === answer.employeeName) {
                                   empName = res[i].employeeName;
                              }
                         }
                         var empNameArray = empName.split(" ");
                         connection.query(
                              "DELETE FROM employee WHERE ?",
                              [
                                   {
                                        first_name: empNameArray[0],
                                   },
                                   {
                                        last_name: empNameArray[1],
                                   },
                              ],
                              function (err) {
                                   if (err) throw err;
                                   console.log(
                                        "Employe record deleted successfully"
                                   );
                              }
                         );
                    });
          }
     );
}

function updateEmployeeByManager() {}

function updateEmployeeByRole() {}

runEmployeeTracker();
