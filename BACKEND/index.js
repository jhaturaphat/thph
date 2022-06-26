const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(cors({origin: [
  "http://localhost:4200"
  ], credentials: true}));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(session({
  secret: 'keyboard secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { /*secure: true*/ }
}));

// สร้าง Custom function

app.use(require('./configs/middleware'));

// เรียกใช้งาน Routes
app.use('/api', require('./routes'));

app.get('*',(req, res) => {
    res.send('<h1>Server is start Sucess</h1>')
})

app.listen(5000, ()=>{console.log("Server is start On PORT 5000");})