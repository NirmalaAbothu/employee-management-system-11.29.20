// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const table = require("console.table");
require("dotenv").config();

// Creatind Sql connection
var connection = mysql.createConnection({
     host: "localhost",

     // Your port; if not 3306
     port: 3306,

     // Your username
     user: "root",

     // Your password
     password: process.env.PW,
     database: "employee_trackerDB",
});

//Calling the runEmployeeTracker function
connection.connect(function (err) {
     if (err) throw err;
     runEmployeeTracker();
});

//runEmployeeTracker function with list of options to display to user
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
                         "Exit",
                    ],
               },
          ])
          .then((response) => {
               const action = response.action;
               switch (action) {
                    case "View All Employees":
                         viewAllEmployees();

                         break;

                    case "View All Employees by Department":
                         viewAllEmployeesByDepartment();
                         break;

                    case "View All Employees by Manager":
                         viewAllEmployeesByManager();
                         break;
                    case "Add Employee":
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
                    case "Exit":
                         closeConnection();
                         break;
               }
          });
}

//function closeConnceion
function closeConnection() {
     connection.end();
}

//function viewAllEmployees to display all employees
function viewAllEmployees() {
     connection.query(
          "select e.first_name,e.last_name,role.title,role.salary,department.name as department ," +
               "CONCAT(m.first_name,' ' ,m.last_name) as Manager from employee e LEFT JOIN  " +
               "employee m ON e.manager_id=m.id INNER JOIN role ON e.role_id = role.id INNER JOIN  " +
               "department ON role.department_id = department.id;",
          function (err, res) {
               if (err) throw err;

               console.table(res);
               runEmployeeTracker();
          }
     );
}

//add employee function

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
                         message: "Select employee's role?",
                    },
               ])
               .then(function (answer) {
                    var roleId;
                    var fullName;

                    for (var i = 0; i < results.length; i++) {
                         if (results[i].title === answer.employeeRole) {
                              roleId = results[i].id;
                         }
                    }

                    //query to ger manager names
                    let query =
                         "SELECT DISTINCT e.id, CONCAT(e.first_name,' ' ,e.last_name) as Manager from employee e";

                    connection.query(query, function (err, res) {
                         if (err) throw err;
                         inquirer
                              .prompt([
                                   {
                                        type: "list",
                                        name: "managerName",

                                        choices: function () {
                                             var managerArray = [];
                                             for (
                                                  var i = 0;
                                                  i < res.length;
                                                  i++
                                             ) {
                                                  managerArray.push(
                                                       res[i].Manager
                                                  );
                                             }
                                             console.log(managerArray);

                                             return managerArray;
                                        },
                                        message:
                                             "Select the manager name for employee",
                                   },
                              ])
                              .then(function (answer2) {
                                   let managerId;

                                   for (var i = 0; i < res.length; i++) {
                                        if (
                                             res[i].Manager ===
                                             answer2.managerName
                                        ) {
                                             managerId = res[i].id;
                                             console.log("Manager");
                                             console.log(managerId);
                                        }
                                   }

                                   connection.query(
                                        "INSERT INTO employee SET ?",

                                        {
                                             first_name: answer.first_name,

                                             last_name: answer.last_name,

                                             role_id: roleId,

                                             manager_id: managerId,
                                        },

                                        function (err) {
                                             if (err) throw err;
                                             console.log(
                                                  "Employee record inserted successfully"
                                             );
                                             runEmployeeTracker();
                                        }
                                   );
                              });
                    });
               });
     });
}

//function to view app employee by department

function viewAllEmployeesByDepartment() {
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
                              "Select the department for which do you want view all employees?",
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

//function to vew all employees by manager
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
                              "Select the manager do you want view all employees?",
                    },
               ])
               .then(function (answer) {
                    let managerId;

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

                         console.table(res);
                         runEmployeeTracker();
                    });
               });
     });
}

//function to remove employee from the table

function removeEmployee() {
     connection.query(
          "SELECT id, CONCAT(e.first_name,' ' ,e.last_name) as employeeName from employee e ",
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
                              message:
                                   "Select the employee do you want remove?",
                         },
                    ])
                    .then(function (answer) {
                         var empName;
                         var empId;
                         for (var i = 0; i < res.length; i++) {
                              if (res[i].employeeName === answer.employeeName) {
                                   empName = res[i].employeeName;
                                   empId = res[i].id;
                                   console.log("This is Id");
                                   console.log(empId);
                              }
                         }
                         var empNameArray = empName.split(" ");
                         console.log(empNameArray);
                         var query = "SET FOREIGN_KEY_CHECKS=0;";

                         query1 = "DELETE FROM employee WHERE id = ? ";

                         connection.query(query, function (err, res) {
                              if (err) throw err;
                         });

                         connection.query(query1, [empId], function (err, res) {
                              if (err) throw err;
                         });
                         connection.query(
                              "SET FOREIGN_KEY_CHECKS=1",

                              function (err) {
                                   if (err) throw err;
                                   console.log(
                                        "Employe record deleted successfully"
                                   );
                                   runEmployeeTracker();
                              }
                         );
                    });
          }
     );
}

//function updated employee by manager

function updateEmployeeByManager() {
     var choiceArray = [];
     var managerArray = [];
     connection.query(
          "SELECT id, CONCAT(e.first_name,' ' ,e.last_name) as employeeName from employee e ",
          function (err, res) {
               if (err) throw err;

               inquirer
                    .prompt([
                         {
                              type: "list",
                              name: "employeeName",

                              choices: function () {
                                   for (var i = 0; i < res.length; i++) {
                                        choiceArray.push(res[i].employeeName);
                                   }

                                   return choiceArray;
                              },
                              message: "Select employee do you want update?",
                         },
                    ])
                    .then(function (answer) {
                         var empId;
                         for (var i = 0; i < res.length; i++) {
                              if (res[i].employeeName === answer.employeeName) {
                                   empId = res[i].id;
                                   console.log("This is empId");
                                   console.log(empId);
                              }
                         }

                         inquirer
                              .prompt([
                                   {
                                        type: "list",
                                        name: "managerName",

                                        choices: function () {
                                             console.log("inside managerName");
                                             console.log(choiceArray);
                                             console.log(res);

                                             for (
                                                  var i = 0;
                                                  i < res.length;
                                                  i++
                                             ) {
                                                  if (
                                                       res[i].employeeName !==
                                                       answer.employeeName
                                                  )
                                                       managerArray.push(
                                                            res[i].employeeName
                                                       );
                                             }

                                             return managerArray;
                                        },
                                        message:
                                             "Select manager do you want assign?",
                                   },
                              ])
                              .then(function (result) {
                                   var managerId;
                                   for (var i = 0; i < res.length; i++) {
                                        if (
                                             res[i].employeeName ===
                                             result.managerName
                                        ) {
                                             managerId = res[i].id;
                                             console.log("This is managerId");
                                             console.log(managerId);
                                        }
                                   }

                                   connection.query(
                                        "UPDATE employee SET ? WHERE ?",
                                        [
                                             {
                                                  manager_id: managerId,
                                             },
                                             {
                                                  id: empId,
                                             },
                                        ],
                                        function (err) {
                                             if (err) throw err;
                                             console.log(
                                                  "employee's manager updated successfully"
                                             );
                                             runEmployeeTracker();
                                        }
                                   );
                                   // runEmployeeTracker();
                              });
                    });
          }
     );
}
// function Updated employee by role
function updateEmployeeByRole() {
     var employeeArray = [];
     var roleArray = [];
     connection.query(
          "SELECT id, CONCAT(e.first_name,' ' ,e.last_name) as employeeName from employee e ORDER BY employeeName",
          function (err, res) {
               if (err) throw err;
               console.log("This is res");
               console.log(res);
               inquirer
                    .prompt([
                         {
                              type: "list",
                              name: "employeeName",

                              choices: function () {
                                   for (var i = 0; i < res.length; i++) {
                                        employeeArray.push(res[i].employeeName);
                                   }
                                   console.log("This is employee array");
                                   console.log(employeeArray);
                                   return employeeArray;
                              },
                              message: "Select employee do you want update?",
                         },
                    ])
                    .then(function (answer) {
                         var empId;
                         for (var i = 0; i < res.length; i++) {
                              if (res[i].employeeName === answer.employeeName) {
                                   empId = res[i].id;
                                   console.log("This is empId");
                                   console.log(empId);
                              }
                         }

                         connection.query(
                              "SELECT id,title from role ORDER BY title",
                              function (err, result) {
                                   if (err) throw err;

                                   inquirer
                                        .prompt([
                                             {
                                                  type: "list",
                                                  name: "roleTitle",

                                                  choices: function () {
                                                       for (
                                                            var i = 0;
                                                            i < result.length;
                                                            i++
                                                       ) {
                                                            roleArray.push(
                                                                 result[i].title
                                                            );
                                                       }

                                                       return roleArray;
                                                  },
                                                  message:
                                                       "Which role do you want assign to selected employee?",
                                             },
                                        ])
                                        .then(function (answer2) {
                                             var roleId;
                                             for (
                                                  var i = 0;
                                                  i < result.length;
                                                  i++
                                             ) {
                                                  if (
                                                       result[i].title ===
                                                       answer2.roleTitle
                                                  ) {
                                                       console.log(
                                                            "This is role"
                                                       );
                                                       roleId = result[i].id;
                                                       console.log(
                                                            "This is roleId"
                                                       );
                                                       console.log(roleId);
                                                  }
                                             }

                                             connection.query(
                                                  "UPDATE employee SET ? WHERE ?",
                                                  [
                                                       {
                                                            role_id: roleId,
                                                       },
                                                       {
                                                            id: empId,
                                                       },
                                                  ],
                                                  function (err) {
                                                       if (err) throw err;
                                                       console.log(
                                                            "employee's role updated successfully"
                                                       );
                                                       runEmployeeTracker();
                                                  }
                                             );
                                        });
                              }
                         );
                    });
          }
     );
}
