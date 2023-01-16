var express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const bodyParser = require("body-parser");

const middleware = require("../middleware/jwtVerify");



 

 

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/login',teacherController.login_get);
router.post('/login',urlencodedParser,teacherController.validate_teacher);

// router.post('/signup',urlencodedParser,teacherController.studentLogin);

router.get('/logout',teacherController.logout);

router.get('/dashboard',middleware,teacherController.dashboard);

router.get('/deletestudent/:rollnumber',middleware,teacherController.studentdelete)

router.get('/editstudent/:rollnumber',middleware,teacherController.studentedit)
router.post('/editstudent',middleware,urlencodedParser,teacherController.studenteditpost)

router.get('/addstudent',middleware,teacherController.addstudent)
router.post('/addstudent',middleware,urlencodedParser,teacherController.addstudentpost)
router.use(express.static('public'))


module.exports = router;