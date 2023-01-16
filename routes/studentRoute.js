var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const studentController = require('../controllers/studentController');


 
var jsonParser = bodyParser.json()
 

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/find',urlencodedParser,studentController.student_login);
router.post('/find',urlencodedParser,studentController.studentLogin);
router.post('/result',urlencodedParser,studentController.search);



router.use(express.static('public')) 


module.exports = router;