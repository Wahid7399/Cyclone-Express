const express=require("express");
const cors=require("cors");
const router = require("./Routes/userrouter");
const productrouter = require("./Routes/productrouter");

const app= express();
app.use(express.json());
// app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})) 
app.use(cors());

app.use("/user",router)
app.use("/product",productrouter);



app.listen(8000);