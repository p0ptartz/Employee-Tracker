const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require("console.table")
require("dotenv").config()

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: "",
      database: process.env.DB_NAME
    }
);

