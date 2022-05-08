const express = require('express')
const {spawn} = require('child_process');
const { stringify } = require('querystring');
var bodyParser = require('body-parser')
const mysql = require('mysql')


const app = express()
const port = 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use(express.urlencoded({extended:true}))
app.use(express.json())


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


app.listen(port, () => console.log(`Example app listening on port ${port} !`))