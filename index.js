const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require("console.table")
require("dotenv").config()

// linking to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: "",
        database: "employee_db"
    }
);

// main prompt questions
const main = [
    {
        type: "list",
        name: "mainChoice",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Deparrtments",
            "Add Department",
            "Quit"
        ]
    }
]

// Questions to be asked when asked to add role, dept, or employee -- put these in a function .then take the data and store into table
const department = [
    {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?"
    }
]

const role = [
    {
        type: "input",
        name: "roleTitle",
        message: "What is the name of the role?",
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary?",
    },
    {
        type: "list",
        name: "departmentId",
        choices: [
            "1",
            "2",
            "3",
            "4"
        ]
    },
]

const employee = [
    {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?"
    },
    {
        type: "input",
        name: "roleId",
        message: "What is the employees role ID?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the employee's manager number?"
    }
]

const addDepartment = () => {
    inquirer.prompt(department)
        .then((data) => {
            // console.log(data.departmentName)
            db.query(`INSERT INTO department(name) VALUES ("${data.departmentName}")`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    init()
                }
            })
        })
}

const addRole = () => {
    inquirer.prompt(role)
        .then((data) => {
            db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.departmentId}")`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    init()
                }
            })
        })
}

const addEmployee = () => {
    inquirer.prompt(employee)
        .then((data) => {
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.roleId}", "${data.managerId}")`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    init()
                }
            })
        })
}

const viewDepartments = () => {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.table(data)
        }
    })
    init()
}

const viewRoles = () => {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.table(data)
        }
    })
    init()
}

const viewEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.table(data)
        }
    })
    init()
}

// function that runs entire prompt
const init = () => {
    inquirer.prompt(main)
        .then((data) => {
            if (data.mainChoice === "Add Department") {
                addDepartment()
            } else if (data.mainChoice === "Add Role") {
                addRole()
            } else if (data.mainChoice === "Add Employee") {
                addEmployee()
            } else if (data.mainChoice === "View All Deparrtments") {
                viewDepartments()
            } else if (data.mainChoice === "View All Roles") {
                viewRoles()
            } else if (data.mainChoice === "View All Employees") {
                viewEmployees()
            } else {
                console.log("Goodbye =)")
                process.exit()
            }

        })

}

init()