const jwt=require('jsonwebtoken');

const jwtVerify=(req,res,next)=>{
    const authtoken=req.cookies.jwt;
    if(authtoken){


        jwt.verify(authtoken,'dexter',(err,admin)=>{
            if(err){

                
                return res.render('teacherLogin',{"msg":"login first"})
            }
            next();
        })
    }else{
        return res.render('teacherLogin',{"msg":"login first"})
    }
}

module.exports=jwtVerify;