const express=require("express");
var cookieParser = require('cookie-parser');
var flush = require('connect-flash');

const bodyParser = require("body-parser");
const app=express();
var path = require('path');

app.use(cookieParser());



app.listen(3000,function(){
    
})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(flush());
app.get("/",function(req,res){
    res.render('teacherLogin')
})

const teacherRoutes=require("./routes/teacherRoute");
const studentsRoutes=require("./routes/studentRoute");
app.use('/teacher',teacherRoutes);
app.use('/student',studentsRoutes);


app.use(bodyParser.urlencoded({ extended: true })); 


app.use(bodyParser.json());
