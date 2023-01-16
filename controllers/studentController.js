var student=require('../models/database');


const student_login = (req, res) => {
    res.render("findResult");
};

const studentLogin = (req,res)=>{
    var name = req.body.name;
    var userdata=[]
    student.studentLoginDetails(name,function(studentData){
       userdata = studentData;
       if(userdata.length==0)
       {  
        res.render("teacherLogin",{error:"no student with this information"})
          
          
       }else{
        res.render("findResult");
       }

    })

};

const search =(req, res) => {
    name=req.body.name;
    rollnumber=req.body.rollnumber;
    var result=[]
    student.searchStudentData(name,rollnumber,function(studentData){
        result=studentData;
        if(result.length==0){
            res.render("findResult",{error:"Not exist"})
        }else{
            console.log(result[0])
            res.render("showResult",{studentData:result[0]})
        }
    }) 
};


module.exports={
    student_login,
    search,
    studentLogin
};