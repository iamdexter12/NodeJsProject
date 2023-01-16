const teacher=require("../models/database")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");



const dashboard =(req,res)=>{
   
        teacher.getAllStudentData(function(allStudent){
            var studentlist=[]
            allStudent.forEach(data => {
                var dob=data.dob.toString();
                
                var student={
                    rollnumber:data.rollnumber,
                    name:data.name,
                    dob:dob,
                    marks:data.marks
                }
            
                studentlist.push(student)
            });
            res.render("dashboard",{students:studentlist})
        })
   
    
}

const logout=(req,res)=>{
    
        res.clearCookie('jwt');
        res.redirect('/teacher/login');
     };


const login_get = (req, res) => {
    res.render("teacherLogin");
};

const login_post = (req, res) => {
    
     var email = req.body.email;
     var password = req.body.password;
     var userdata=[]
     teacher.findteacher(email,password,function(teacherData){
        userdata = teacherData;
        if(userdata.length==0)
        {

            
           res.render("teacherLogin",{error:"no teacher with this information"})
           
        }else{
            
            res.redirect('/teacher/dashboard')
        }

     })
  
};

const studentdelete=(req,res)=>{
    var rollnumber=req.params.rollnumber;
    teacher.deleteStudentById(rollnumber,function(data){
        res.redirect("/teacher/dashboard")
    });

}

const studentedit=(req,res)=>{
    teacher.findStudentByRollnumber(req.params.rollnumber,function(data){
        
        res.render("editStudent",{student:data[0]})
    });

}

const studenteditpost=(req,res)=>{
   
    teacher.updateStudentById(req.body.rollnumber,req.body.name,req.body.dob,req.body.marks,function(data){
        res.redirect("/teacher/dashboard")
    })

}

const addstudent=(req,res)=>{
   
        res.render("addStudent")
  
}

// const signup = (req,res)=>{
//     var email = req.body.email
//     var password = req.body.password
//     var teacherData=[];
//     teacher.teachersignup(email,password,function(data){
//         teacherData = data;
//         console.log(teacherData);
//         if(data!="TEACHER")
//         {
//             // console.log(data);
//             res.render("teacherLogin")
//         }
//         else{
//             // console.log(data);
//             res.render("home")
//         }
//     })
   
// }

const addstudentpost=(req,res)=>{
    var rollnumber=req.body.rollnumber
    var name=req.body.name
    var dob=req.body.dob
    var marks=req.body.marks
    
    teacher.addStudent(rollnumber,name,dob,marks,function(data){
        if(data!="Already exists"){
            
           return res.redirect("/teacher/dashboard")
            // res.render("addStudent",{message:"Successfully Added"})
        }
        else{
            teacher.getAllStudentData(function(allStudent){
                var studentlist=[]
                allStudent.forEach(data => {
                    var dob=data.dob.toString();
                    
                    var student={
                        rollnumber:data.rollnumber,
                        name:data.name,
                        dob:dob,
                        marks:data.marks
                    }
                
                    studentlist.push(student)
                });
                console.log(studentlist);
                res.render("dashboard",{students:studentlist,message:"Already exist"})
                return;
            })
           
         
        }
        
    })
}

const validate_teacher = async (req, res) => {

    const { email, password } = req.body;
    teacher.validate(email, async function (result) {
      if (result.length!=0) {
        console.log(result[0].password);
        const validate = await bcrypt.compare(password, result[0].password);
        if (!validate) {
          return res.render("teacherLogin", {
            message: "Wrong email or password",
          });
        } else {
          const data = {
            user: {
              id: email,
            },
          };
          const authtoken = jwt.sign(data, "dexter");
          res.cookie("jwt", authtoken, {
            expires: new Date(Date.now() + 500000),
            httpOnly: true,
          });
          // console.log(req.cookies.jwt);
          res.redirect("/teacher/dashboard");
        }
      } else {
        res.render("teacherLogin", { error: "Worng email or Password" });
      }
    });



    // const { email,password}=req.body;
    // const hashPassword=await bcrypt.hash(password,10)
    // teacher.authentication(email,hashPassword,function(data){
    //     if(data=="invailid")
    //     {
            
    //         return res.json({
    //             message:"Something went worng"
    //         });
    //     }
    //})
    // connection.query("Insert Into teachers set email=?,password=? ",[email,hashPassword], function (err, result, fields) {
    //  if (err) {
    //             return res.json({
    //                 message:"Something went worng"
    //             });
    //         }
    //     });



    // res.render('dashboard');
};

module.exports={
    login_get,
    login_post,
    dashboard,
    logout,
    studentdelete,
    studentedit,
    studenteditpost,
    addstudent,
    addstudentpost,
    validate_teacher
    //signup
    
}