var express = require('express');
var router = express.Router();
var user=require('../databases/user_db').userdata;
var sendgrid=require('../mail_demo.js');
var mongoose = require('mongoose');
var passport=require('../passport/passport_configure.js');

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

// router.post('/login', passport.authenticate('local', {
//         successRedirect : '/', // redirect to the secure profile section
//         failureRedirect : '/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));

// router.post('/login',

// 	passport.authenticate('local'),

// 	function(req,res,next){
// 	// console.log("entered next callback");
// 	// var data = req.body;
// 	// users_api.find(data,function(err,data){
// 	// 	if(err){
// 	// 		console.log("error login/retrieving info");
// 	// 		res.send(err.message);
// 	// 	}
// 	// 	else{
// 	// 		console.log("login request approved");
// 	// 		console.log(data);
// 	// 		if(data){
// 	// 			res.send(true);
// 	// 		}
// 	// 		else{
// 	// 			res.send(false);
// 	// 		}
// 	// 	}
// 	res.send();
// 	}
// );


router.post('/register', function(req, res, next){
	user.register(req.body,function(error,data){
		if(error){
			res.send(false);
		}
		else{
			res.send(true);
		}
	});
});

router.get('/get_user/:userId', function(req, res, next){
	user.getUser({"_id":req.params.userId},function(error,data){
		if(error){
			res.send(false);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/verifyUser/:email/:verification_code', function(req, res, next){
	user.verify(req.params.verification_code,{"verified":true},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.post('/login', function(req, res, next){

	passport.authenticate('local',function(err,data,message){
		res.send(data);
	})(req,res,next);

});

router.post('/forgot_password', function(req, res, next){
	user.forgotPassword(req.body,function(error,data){
		if(data.length==0||error){
			res.send(false);
		}
		else{
			var options = {
				  to:       'sameer.chetiwal@daffodilsw.com',
				  from:     'noreply@fb.com',
				  subject:  'Change Password',
				  text:     'link to change your password',
				  'html' : "<a href='http://192.168.100.114:3000/#/reset_password/"+ req.body.email+"'>Click on this link to change password.</a>"
			}
			sendgrid(options);
			res.send(true);
		}
	});
});

router.post('/reset_password/:email', function(req, res, next){
	user.resetPassword({"email":req.params.email},req.body,function(error,data){
		if(error){
			res.send(false);
		}
		else{
			res.send(true);
		}
	});
});


router.get('/logout',function(req, res, next){
		req.session.remove();
		res.send("logged out");
});

router.get('/get_categories',function(req,res,next){
	user.getCategory(function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.post('/add_category',function(req,res,next){
	user.addCategory(req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.delete('/delete_category/:catId',function(req,res,next){
	user.deleteCategory({"_id":req.params.catId},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
			console.log("aaaaaaaaaavvvvvvvv",data)
		}
	});
});

router.put('/update/:userId', function(req, res, next){
	console.log("userId",req.params.userId,"req.body",req.body)
	user.updateUser({"_id":req.params.userId},req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			console.log("aaaaaaaaaaaaaaaaa",data);
			res.send(data);
		}
	});
});

module.exports = router;