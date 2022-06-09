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
    let data = await req.body;
    console.log(data.userInf);
    
    // let sql =  await sqlGeneratorSearch(req, {
    //     singleResult: true,
    //     table: 'users',
    //     searchKeys: data.userInf,
    //     toFindKey: ['user_id'],
    //     session: {}
    // });
    // console.log(sql);
    // let user_id = await executeSqlQuery(sql);
    let user_id = parseInt(data.userInf.user_id);

    
    await executeSqlQuery(`delete from active_sessions where user_id = '${user_id}';`)

    let sql_insert = await sqlGeneratorInsert(req, {
        table: 'active_sessions',
        insertKeyValue: {
            'session_id': req.session.id,
            'user_id': user_id,
        },
        session: {}
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
        toFindKey: ['*'],
        session:{}
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
                session_id: sessionId,
            },
            session: {},
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
    var sql = '';
    return new Promise ((resolve, reject)=>{
        if (searchKeys.singleResult && searchKeys.session){
            sql =  `select ${searchKeys.toFindKey[0]} from ${searchKeys.table} where `
            for (var keys in searchKeys.searchKeys){
                sql += `${keys} = '${searchKeys.searchKeys[keys]}' and `
            }
            sql = sql.slice(0, -4);
            sql += ';'
        }
        else{
            if (searchKeys.toFindKey){
                sql = 'SELECT '
                for (let column of searchKeys.toFindKey){
                    sql += `${column}, `
                }
                sql = sql.slice(0, -2)
            }
            else{
                sql = `select *`
            }
            sql += ` from ${searchKeys.table} `

            if (searchKeys.searchKeys){
                sql += 'where '
                for (let key in searchKeys.searchKeys){
                    sql += ` ${key} ${searchKeys.searchKeys[key]} `
                }
            }
            if(searchKeys.order_by){
                sql += ` order by ${searchKeys.order_by} `
            }
            if(searchKeys.limit){
                sql += ` limit ${searchKeys.limit} `
            }


            sql += ';'
        }
        console.log(sql);


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


app.post('/api/loadQuestions', async (req, res) => {
    var data = req.body
    var sql = ''
    if (data.for === 'quick'){
        sql = await sqlGeneratorSearch(req, {
            singleResult: false,
            table: 'questions',
            searchKeys:{
                'question_id' : ' < 35'
            },
            toFindKey:['question_id', 'question', 'right_answer', 'option1','option2','option3'],
            limit: 8,
            order_by: 'rand()' 
        })
    }
    else {
        sql = await sqlGeneratorSearch(req, {
            singleResult: false,
            table: 'questions',
            // searchKeys:{
            //     'question_id' : ' < 35'
            // },
            toFindKey:['question_id', 'question', 'right_answer', 'option1','option2','option3'],
            limit: data.numberOfQuestions,
            order_by: 'rand()' 
        })
    }

    var queryRes = await executeSqlQuery(sql);

    res.send(queryRes)
})




app.post('/api/communicate', (req, res) => {
    var data = req.body;
    console.log(data.mes)
    res.send("Hello From NodeJS")
})

app.post('/api/recordUserResponse', async (req, res) => {
    var data = req.body,
    responses = data.response;

    console.log(data);
    var sql = ''

    sql = await sqlGeneratorInsert(req, {
        table: 'all_response',
        insertKeyValue: {
            'user_id': data.userInf.user_id,
            'response_type': data.type
        }
    })
    // console.log(sql);

    var queryRes = await executeSqlQuery(sql);

    sql = await sqlGeneratorSearch(req,
        {
            singleResult: false,
            table: 'all_response',
            searchKeys:{
                'user_id' : ` = '${data.userInf.user_id}' `
            },
            toFindKey:['all_response_id'],
            limit: 1,
            order_by: ' all_response_id desc' 
        }
        )

    queryRes = await executeSqlQuery(sql);
    
    // console.log(queryRes[0].all_response_id);

    // console.log(queryRes);

    var all_response_id = queryRes[0].all_response_id; // need to determine this

    for (let questionID in responses){
        sql = await sqlGeneratorInsert(req, {
            table: 'question_answer',
            insertKeyValue: {
                'question_id': questionID,
                'answered_question': responses[questionID],
                'all_response_id': all_response_id
            }
        })
        await executeSqlQuery(sql);
    }


    res.send(String(all_response_id))
})

app.post('/api/requestLogin', async (req, res) => {
    console.log('Request received for admin Login')

    let data = await req.body
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

app.post('/api/getResponseAndScore', async(req, res)=>{
    var data = await req.body;
    console.log(`\nGenerating user response\n`);
    // console.log(data);

    var all_response_id = data.all_response_id // need to determine this

    var sql =  `select q.question, q.right_answer, case
	when qa.answered_question = 0 then q.right_answer
    when qa.answered_question = 1 then q.option1
    when qa.answered_question = 2 then q.option2
    else q.option3
    end answered_option, 
    if(qa.answered_question = 0, 'true', 'false') correct
    from question_answer qa
    inner join questions q on q.question_id = qa.question_id
    inner join all_response ar on qa.all_response_id = ar.all_response_id
    inner join users u on u.user_id = ar.user_id where ar.all_response_id = ${all_response_id};`;


    var queryRes = await executeSqlQuery(sql);
    var queryRes2 = await executeSqlQuery( `select count(*) count from ( ${sql.slice(0,-1)} ) temp_table where temp_table.correct = 'true';`);


    res.send({
        score: queryRes2[0].count,
        response: queryRes
    })


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






// Exam Progress APIs

app.post('/api/userExamRecords', async (req, res)=>{
    var data = req.body;

    var sql = await sqlGeneratorSearch(req, 
        {
            singleResult: false,
            table: 'all_response',
            searchKeys:{
                'user_id' : ` = '${data.userInf.user_id}'`
            },
            // toFindKey:['question_id', 'question', 'right_answer', 'option1','option2','option3'],
            // limit: 8,
            // order_by: 'rand()' 
        })

    var queryRes = await executeSqlQuery(sql);
    
    // var queryRes1 = await executeSqlQuery(sql); 
    
    var allResponse = []

    
    for (let responseKeyValue of queryRes){
        sql = `select count(*) count from (select * from question_answer where all_response_id = '${responseKeyValue.all_response_id}' and answered_question = '0') x;`
        let temp = responseKeyValue
        let queryRes1 = await executeSqlQuery(sql);

        temp['score'] = queryRes1[0].count;
        allResponse.push(temp);
    }
    
    res.send(allResponse);
})








app.listen(port, () => console.log(`Example app listening on port ${port} !`))