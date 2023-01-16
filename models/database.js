var mysql = require('mysql2');


  var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "110062",
  database: "resultmanagement"
});

connection.connect(function(err){
    if (err) throw err
});

function deleteStudentById(rollnumber,Callback){
  return connection.query("delete from students where rollnumber=?",[rollnumber],function(err,result){
    if(err) throw err;
    Callback(result);
  })

}

function findteacher(email,password,Callback){
  return connection.query("select * from teachers where email=? and password=?",[email,password],function(err,result){
    if(err) throw err;
    Callback(result)
  })
}
function findStudentByRollnumber(rollnumber,Callback){
  return connection.query("select * from students where rollnumber=?",[rollnumber],function(err,result){
    if(err) throw err;
    Callback(result)
  })
}

function updateStudentById(rollnumber,name,dob,marks,Callback){
  return connection.query("update students set name=?,marks=?,dob=? where rollnumber=?",[name,marks,dob,rollnumber],function(err,result){
    if(err) throw err;
    Callback(result)
  })
}

function  getAllStudentData(Callback){
    return connection.query("select * from students",function(err,result){
      if(err) throw err;
      Callback(result);
    })
    
}

function searchStudentData(name,rollnumber,Callback){
    return  connection.query("SELECT * FROM students where name = ? and rollnumber = ?",[name,rollnumber] ,function (err, result) {
        if (err) throw err;
        Callback(result);
      });
}

function checkLoginDetails(email,password,Callback){
  return  connection.query("SELECT * FROM teachers where email = ? and password = ?",[email,password] ,function (err, result) {
    if (err) throw err;
    Callback(result);
  });
}

function studentLoginDetails(name,Callback){
  return  connection.query("SELECT * FROM studentlogin where name = ?",[name] ,function (err, result) {
    if (err) throw err;
    Callback(result);
  });
}

function teachersignup(email,password,Callback){
  return connection.query("Insert Into teachers set email=?,password=?",[email,password],function(err,result){
    if(err){
      Callback("TEACHER")
    }
    Callback(result)
  })

}

function addStudent(rollnumber,name,dob,marks,Callback){
 
  return connection.query("Insert Into students set rollnumber=?,name=?,dob=?,marks=? ",[rollnumber,name,dob,marks],function(err,result){
    if(err){
      Callback("Already exists")
    } 
    Callback(result)
  })
}
function authentication(email,password,Callback){
  return connection.query("Insert Into teachers set email=?,password=? ",[email,password], function (err, result) {
    if(err){
      
      Callback("invailid")
    } 
    Callback(result)
  });

}
 function validate(email,Callback){
  return connection.query("SELECT * FROM teachers where email=? ", [email], async function (err, result, fields) {
    if(err){
      
      Callback("invailid data")
    } 
    else{
      Callback(result)
    }
   
  });
    
 }

module.exports={
    getAllStudentData,
    searchStudentData,
    checkLoginDetails,
    getAllStudentData,
    deleteStudentById,
    findteacher,
    findStudentByRollnumber,
    addStudent,
    teachersignup,
    studentLoginDetails,
    updateStudentById,
    authentication,
    validate
}