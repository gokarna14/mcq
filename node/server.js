const express = require('express')
const {spawn} = require('child_process');
const { stringify } = require('querystring');
var bodyParser = require('body-parser')
const mysql = require('mysql');
const { appendFileSync } = require('fs');
const fs = require('fs'); 
const { parse } = require('csv-parse');

const app = express()
const port = 4000
 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: "123570123570",
    database: 'mcq',
})

const check ={
    'users' : ['phone_number', 'email']
}

db.connect((err)=>{
    if(err){ 
        console.log(err)
        console.error("Error on db connect");
    }
    else{
        console.log('MySQL connected'); 
    }
}) 

app.post('/api/communicate', (req, res)=>{ 
    var data = req.body;
    console.log(data.mes)
    res.send("Hello From NodeJS")
})

app.post('/api/sumOfTwoNumbers', (req, res)=>{ 
    var data = req.body;
    console.log(data)
    let sum = parseInt(data.a) + parseInt(data.b)
    console.log(sum)
    res.send(String(sum))
})

app.post('/api/loadCSV', (req, res)=>{
    console.log("Request To load CSV: ")
    var data = req.body
    console.log(data)

    var csvData=[], count = 0;
    fs.createReadStream('../src/resources/csv/'+ data.what +'.csv')
        .pipe(parse({delimiter: '/t'}))
        .on('data', function(csvrow) {
            // if (count++ === 0){
            //     console.log(csvrow)
            // }
            csvData.push(csvrow);        
        })
        .on('end',function() {
        console.log(sqlQuery('SELECT * FROM questions'))
        for (let i in csvData){
            if ( i!== 0){
                var arr = (csvData[i][0].split(',')),
                sql = "INSERT INTO questions VALUES "
            }
        }
        res.send(csvData[0])
        }); 


})

app.post('/api/loadQuestions', (req, res)=>{
    var data = req.body 
    console.log("Request received to load questions.")
    console.log("Number: " + data.N)

    if (data.quickExam){
        sqlQuery('select * from questions where question_id < 35 order by rand() limit ' + data.N, res)
    }
    else{
        sqlQuery('select * from questions order by rand() limit ' + data.N, res)
    }

})

app.post('/api/getUserIP', (req, res)=>{
    console.log('Request received for IP address.')
    console.log(req.headers['x-forwarded-for'])

})

app.post('/api/requestLogin', (req, res)=>{
    console.log('Request received for admin Login')

    let data = req.body
    console.log(req.body)
    if (Object.keys(data).length === 0){
        res.send("0")
    }
    else{
        let sql = "select count(*) from admin where ( "
        
        for (let i in data){
            sql += i + " = '" + data[i] + "' and "
        }
        sql = sql.slice(0, -4)
        sql += ');'
        
        sqlQuery(sql, res, true)
        
    }
})

app.post('/api/UserLogIn', (req, res)=>{
    console.log('Request received for user Log in')

    let data = req.body
    console.log(req.body)
})
app.post('/api/UserSignUp', (req, res)=>{
    console.log('Request received for user Sign Up')

    let data = req.body
    console.log(req.body)

    var sql = "insert into users ("

    for (let i in data){
        sql += i + ' ,'
    }
    sql = sql.slice(0, -2)
    sql += ") values ("
    for (let i in data){
        sql += "'" + data[i] + "' ,"
    }
    sql = sql.slice(0, -2)
    sql += ");"
    console.log(sql);
    sqlQuery(sql);
})


app.post('/api/presentOrNot', (req, res)=>{ //inf, what
    console.log('Request received for present or not')

    let data = req.body
    console.log(data)

    var sql = "select count(*) from " + data.what + " where ( ",
    toCheck = check[data.what]

    for(let i in toCheck){
        sql += toCheck[i] + " = '" + data[toCheck[i]] + "' and "
    }
    sql = sql.slice(0, -4)
    sql += ");"

    sqlQuery(sql, res, true)

    
})

function sqlQuery(sql, res='', count=false){
    if (count){
        console.log('Returning count');
        return db.query(sql, function (err, result) {
            if (err){
                console.log(err)
                console.log('Error in SQL Query')
                console.log('-> ' + sql);
            }   
            else{         
            console.log("Executed following SQL query:");
            console.log('-> ' + sql); 
            let c = result[0][ 'count(*)' ]
            console.log(c);
            res.send(String(c));
            }
          });
    }
    else{
        return db.query(sql, function (err, result) {
            if (err){
                console.log(err)
                console.log('Error in SQL Query')
                console.log('-> ' + sql);
            }   
            else{         
            console.log("Executed following SQL query:");
            console.log('-> ' + sql); 
            if (res!==''){
                res.send(result)
            }
            }
        });
    }
}






app.listen(port, () => console.log(`Example app listening on port ${port} !`))