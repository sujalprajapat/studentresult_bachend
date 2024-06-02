var express = require('express');
var router = express.Router();
var user= require('../controller/usercontroller');

router.get('/addstu',user.stuadd);
router.get('/viewstu',user.stuview);
router.get('/upstu/:id',user.stuup);
router.get('/delstu/:id',user.studel);
router.get('/stulogin',user.stulogin);
router.get('/stulogout',user.stulogout);
router.get('/addstaff',user.staffadd);
router.get('/viewstaff',user.staffview);
router.get('/upstaff/:id',user.staffup);
router.get('/delstaff/:id',user.staffdel);
router.get('/stafflogin',user.stafflogin);
router.get('/stafflogout',user.stafflogout);
router.get('/addresult',user.addresult);
router.get('/viewresult',user.viewresult);
router.get('/upresult/:id',user.upresult);
router.get('/delresult/:id',user.delresult);
router.get('/std',user.stdwise);
module.exports = router;