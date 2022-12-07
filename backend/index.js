const express=require("express");
const cors=require("cors");
const router = require("./Routes/userrouter");
const productrouter = require("./Routes/productrouter");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql=require("mysql");
var bodyParser = require("body-parser");
const destroysess = require("./Controllers/destroysess");
const path=require("path")
const getsess = require("./Controllers/getsess");
const multer = require("multer");
const MySQLStore = require('express-mysql-session')(session);

const app= express();
app.use(express.json());
// app.set('view engine', 'ejs');
app.use(express.static( path.join(__dirname, './public')))
app.use('/user', express.static('public'))
app.use(express.urlencoded({extended: true})) 
app.use(cors());
app.use(bodyParser.json());

const options = { // setting connection options
    host: 'db4free.net',
    user: 'wahid123',
    password: '12345678',
    database: 'database3021',
};


const connection = mysql.createConnection(options);
const sessionStore = new MySQLStore({}, connection);

app.use(

    session({
        secret: 'cookie_secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,      // assigning sessionStore to the session
        cookie: {
            httpOnly:false
        }
    }
    )
);
app.use(cookieParser());
app.use(express.static( path.join(__dirname, './public')))

app.use('/user', express.static('public'))
app.use('/product', express.static('public'))
app.get("/getsession",(req,res)=>{
    getsess(req,res)
})









try{

app.use("/user",router);
app.use("/product",productrouter);
}
catch(err){
    console.log(err);
}







app.get("/destroysession",(req,res)=>{
    destroysess(req,res)
})
app.listen(8000);

