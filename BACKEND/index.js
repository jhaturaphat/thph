require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
// const session = require('express-session');
const app = express();


// const sslServer = https.createServer(
//   {
//     key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem')),
//   },
//   app
// )

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// app.use(session({
//   secret: 'keyboard secret key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { /*secure: true*/ }
// }));

// สร้าง Custom function

app.use(require('./configs/middleware'));

// เรียกใช้งาน Routes
app.use('/api', require('./routes'));

app.get('*',(req, res) => {
    res.send('<h1>Server is start Sucess</h1>')
})

const PORT = process.env.PORT;
// sslServer.listen(PORT, ()=>{console.log(`Server is start On PORT ${PORT}`)});
app.listen(PORT, ()=>{console.log(`Server is start On PORT ${PORT}`);})