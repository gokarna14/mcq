const express = require('express')
const mysql = require('mysql');
const fs = require('fs');
const { parse } = require('csv-parse');
const session = require('express-session');

const app = express()

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "ssecretKey",
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
    })
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const port = 4000

const table_names = {
    active_sessions: 'active_sessions'
}


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "123570123570",
    database: 'mcq',
})

const check = {
    'users': ['phone_number', 'email']
}

app.get('/', function(req, res) {
    console.log(req.session.id);
    res.send('Session ID: ' + req.session.id);
})

app.get('/logout', function(req, res) {

    console.log(req.session.id + '\nDestroyed !');
    req.session.destroy();

})

db.connect((err) => {
    if (err) {
        console.log(err)
        console.error("Error on db connect");
    } else {
        console.log('MySQL connected');
    }
})

app.post("/api/sessionRemoveAuth", async (req, res) => {
    console.log(req.session.id + '\nDestroyed !');
    await executeSqlQuery(`delete from active_sessions where session_id = '${req.session.id}'`);
    req.session.destroy();
})

app.post("/api/sessionAuth", async (req, res) => {
    
    console.log('\nAuthenticating Session:');
    let data = req.body;
    
    let sql =  await sqlGeneratorSearch(req, {
        singleResult: true,
        table: 'users',
        searchKeys: data.userInf,
        toFindKey: ['user_id']
    });
    // console.log(sql);
    let user_id = await executeSqlQuery(sql);
    user_id = parseInt(user_id[0]['user_id']);
    
    await executeSqlQuery(`delete from active_sessions where user_id = '${user_id}';`)

    let sql_insert = await sqlGeneratorInsert(req, {
        table: 'active_sessions',
        insertKeyValue: {
            'session_id': req.session.id,
            'user_id': user_id
        }
    })


    await executeSqlQuery(sql_insert);

    console.log(req.session.id + '\nSession Authenticated !');



    res.send('Session ID: ' + req.session.id);
})

app.post("/api/sessionInfo", (req, res) => {
    console.log(req.session.id + '\nRequest for session info');
})
app.post("/api/checkActiveSession", async (req, res) => {

    var sessionId = await getSessionID(req);
    let sql = await sqlGeneratorSearch(req, {
        singleResult: true,
        table: 'active_sessions',
        searchKeys: {
            session_id: sessionId
        },
        toFindKey: ['*']
    });

    let queryRes = await executeSqlQuery(sql); 
    if (queryRes.length === 0){
        res.send('-69');
    }
    else{

        let sql_user_id =  await sqlGeneratorSearch(req, {
            singleResult: true,
            table: 'active_sessions',
            searchKeys: {
                session_id: sessionId
            },
            toFindKey: ['user_id']
        });
        let user_id = await executeSqlQuery(sql_user_id);
        user_id = parseInt(user_id[0]['user_id']);


        res.send(String(user_id));
    }

})
app.post('/api/UserLogInWithID', async (req, res) => {
    console.log('\n\nRequest received for user Log in with ID')
    let user_id = req.body['user_id'],
    sql = `select * from users where user_id = '${user_id}';` 

    let queryRes = await executeSqlQuery(sql);
    console.log('\n\n');

    res.send(queryRes);

})

const sqlGeneratorInsert = (req, insertKeys)=>{
    return new Promise ((resolve, reject)=>{
        var sql =  `insert into ${insertKeys.table} (`

        var keyValue = insertKeys.insertKeyValue;

        Object.keys(keyValue).forEach((key)=>{
            sql += `${key}, `;
        })
        sql = sql.slice(0, -2);
        sql += ') values (';
        Object.keys(keyValue).forEach((key)=>{
            sql += `'${keyValue[key]}', `
        })
        sql = sql.slice(0, -2);
        sql += ');'
        resolve(sql);
    })
}

const getSessionID = async(req)=>req.session.id;

const sqlGeneratorSearch = (req, searchKeys)=>{
        // searchkeys: singleResult, table, searchKeys, toFindKey
    return new Promise ((resolve, reject)=>{
        if (searchKeys.singleResult){
            var sql =  `select ${searchKeys.toFindKey[0]} from ${searchKeys.table} where `
            for (var keys in searchKeys.searchKeys){
                sql += `${keys} = '${searchKeys.searchKeys[keys]}' and `
            }
            sql = sql.slice(0, -4);
            sql += ';'
        }
        resolve(sql);
    })

}

const executeSqlQuery= async(sql)=>{
    return new Promise((resolve, reject)=>{
        db.query(sql, async (err, result)=>{
            if (err) {
                // reject(err);
                console.log('\n\nError in SQL Query')
                console.log('-> ' + sql);
            } else {
                console.log("\n\nExecuted following SQL query:");
                console.log('-> ' + sql);
                let res = await result;
                // console.log(c);
                resolve(res);
            }
        })
    })
}


app.post('/api/loadQuestions', (req, res) => {
    var data = req.body
    res.send(`So you want questions for ${data.for}?`)
})




app.post('/api/communicate', (req, res) => {
    var data = req.body;
    console.log(data.mes)
    res.send("Hello From NodeJS")
})



app.post('/api/requestLogin', (req, res) => {
    console.log('Request received for admin Login')

    let data = req.body
    console.log(req.body)
    if (Object.keys(data).length === 0) {
        res.send("0")
    } else {
        let sql = "select count(*) from admin where ( "

        for (let i in data) {
            sql += i + " = '" + data[i] + "' and "
        }
        sql = sql.slice(0, -4)
        sql += ');'

        sqlQuery(sql, res, true)

    }
})


app.post('/api/UserSignUp', (req, res) => {
    console.log('Request received for user Sign Up')

    let data = req.body
    console.log(req.body)

    var sql = "insert into users ("

    for (let i in data) {
        sql += i + ' ,'
    }
    sql = sql.slice(0, -2)
    sql += ") values ("
    for (let i in data) {
        sql += "'" + data[i] + "' ,"
    }
    sql = sql.slice(0, -2)
    sql += ");"
    console.log(sql);
    sqlQuery(sql);
})


app.post('/api/presentOrNot', (req, res) => { //inf, what
    console.log('Request received for present or not')

    let data = req.body
    console.log(data)

    var sql = "select count(*) from " + data.what + " where ( ",
        toCheck = check[data.what]

    for (let i in toCheck) {
        sql += toCheck[i] + " = '" + data[toCheck[i]] + "' and "
    }
    sql = sql.slice(0, -4)
    sql += ");"

    sqlQuery(sql, res, true)


})

app.post('/api/getUserInf', (req, res) => {
    console.log("Request received to access user information");
    let data = req.body
    console.log(data)

    var sql = "select * from users where ( ",
        toCheck = Object.keys(data)

    for (let i in toCheck) {
        sql += toCheck[i] + " = '" + data[toCheck[i]] + "' and "
    }
    sql = sql.slice(0, -4)
    sql += ");"

    console.log(sql);

    sqlQuery(sql, res)
})


function sqlQuery(sql, res = '', count = false) {
    if (count) {
        console.log('Returning count');
        return db.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                console.log('Error in SQL Query')
                console.log('-> ' + sql);
            } else {
                console.log("Executed following SQL query:");
                console.log('-> ' + sql);
                let c = result[0]['count(*)']
                console.log(c);
                res.send(String(c));
            }
        });
    } else {
        return db.query(sql, function(err, result) {
            if (err) {
                console.log(err)
                console.log('Error in SQL Query')
                console.log('-> ' + sql);
            } else {
                console.log("Executed following SQL query:");
                console.log('-> ' + sql);
                if (res !== '') {
                    res.send(result)
                }
            }
        });
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port} !`))