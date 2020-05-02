const mysql = require('mysql');
const express = require('express');
var app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeDB'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded');
    else
    console.log('DB connection failed \n Error: '+JSON.stringify(err, undefined, 2));
});

//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

//Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE empid= ?',[req.params.id], (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

//Delete an employee 
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE empid= ?',[req.params.id], (err, rows, fields) => {
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    });
});

//Insert an employee 
app.post('/employees', (req, res) => {
    mysqlConnection.query('INSERT INTO Employee VALUES(?, ?, ?, ?)',['', 'sawan', 'EMP46', '800000'], (err, rows, fields) => {
        if(!err)
        res.send('Inserted successfully');
        else
        console.log(err);
    });
});

//Update an employee 
app.put('/employees/:id', (req, res) => {
    mysqlConnection.query('UPDATE Employee SET name=? WHERE empid= ?',['prince', req.params.id], (err, rows, fields) => {
        if(!err)
        res.send('Updated successfully');
        else
        console.log(err);
    });
});

app.listen(3000, () => console.log("Server has started on port 3000"));