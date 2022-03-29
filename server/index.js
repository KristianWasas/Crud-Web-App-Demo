const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test')
});

//Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err) =>{
        if(err){
            throw err;
        }
        res.send("Database Created");
    })  
});

app.post('/exists', (req, res) => {
    const template = req.body.template
    const sql = `SELECT * FROM ${template.tablename}`;
    db.query(sql, (err, result) => {
        res.send(result)
    })
})

//Table creation
app.post('/createtable', (req, res) => {
    
    const template = req.body.template

    const jsonToSQL = new Map()
    jsonToSQL.set('string', 'CHAR(100)')
    jsonToSQL.set('boolean', 'BOOL')
    jsonToSQL.set('date', 'DATE')
    jsonToSQL.set('integer', 'INT(255)')

    let templateVariables = '(id int AUTO_INCREMENT'

    for(i in template.properties){
        templateVariables += ', '
        templateVariables += i
        templateVariables += ' '
        if(jsonToSQL.get(template.properties[i].hasOwnProperty("date"))){
            templateVariables += "DATE"
        }else{
            templateVariables += jsonToSQL.get(template.properties[i].type)
        }
        
    }

    templateVariables += ', PRIMARY KEY(id))'

    db.query(`CREATE TABLE ${template.tablename} ${templateVariables}`, err => {
        if(err){
            res.send("Table already exists or invalid JSON template")
        }else{
            res.send("Table created")
        }
    })
})

//Insert element to table
app.post("/insert", (req, res) => {
    
    const template = req.body.template
    const data = req.body.data

    let count = -1
    for(i in data){
        count += 1
    }

    let a = "(?"
    for(let i = 0; i<count; i++){
        a += ", ?"
    }
    a += ")"

    let b = "("
    let count2 = 0
    for(i in data){
        b += i
        if(count > count2){
            b += ", "
        }
        count2 += 1
    }
    b += ")"

    const sql = `INSERT INTO ${template.tablename} ${b} VALUES ${a}`

    let values = []

    for(i in data){
        values.push(data[i])
    }

    db.query(sql, values, (err) => {
        if(err){
            res.send("ERROR")
        }else{
            res.send("Data added to table")
        }
    })

})

//display all elements
app.post("/getelements", (req, res) => {

    const template = req.body.template

    let sql = `SELECT * FROM ${template.tablename}`
    db.query(sql, (err, result) => {
        if(err){
            res.send("ERROR")
        }else{
            res.send(result)
        }
    })
})

//delete element
app.post("/deleteelement/:index", (req, res) => {

    const elementID = req.params.index
    const template = req.body.template
    const sql = `DELETE FROM ${template.tablename} WHERE id = ${elementID}`

    db.query(sql, (err) => {
        if(err){
            res.send("ERROR")
        }else{
            res.send("Deleted element")
        }
    })
    
})

//edit element
app.post("/editelement/:id", (req, res) => {
    
    const template = req.body.template
    const id = req.params.id
    let data = req.body.data
    
    let count = -1
    for(i in data){
        count += 1
    }

    let count2 = 0

    let newData = " "

    for(let i in template.properties){
        newData += i
        newData += " = "
        if(template.properties[i].type === "string"){
            newData += "'"
        }
        newData += data[i]
        if(template.properties[i].type === "string"){
            newData += "'"
        }
        if(count > count2+1){
            newData += ","
        }
        newData += " "
        count2 += 1
    }

    const sql = `UPDATE ${template.tablename} SET ${newData} WHERE id = ${req.params.id}`
    db.query(sql, (err) => {
        if(err){
            res.send("ERROR EDITING DATA")
            throw err
        }else{
            res.send("DATA SUCCESFULLY EDITED")
        }
    })
    
})

//Database
const db = mysql.createConnection   ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//Just connecting to sql
db.connect(err => {
    if(err){
        throw err
    }
    console.log('MySQL Connected')
})

app.listen('3001', () =>{
    console.log('Backend on server 3001')
})