
// var User=require('../databases/user_db.js').userdata;
// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ userName: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.password!=password) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// module.exports=passport;

var passport=require('passport');
var Users_api=require('../databases/user_db').userdata;

localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy({
  usernameField:'email',
  passwordField:'password'
  },
  function(username, password, done){
    console.log("..here in username",username);
    console.log("..here in password",password);
    Users_api.login({'email':username},function(err,user){
      if(err){
        return done(err);
      }
      if(user.length==0){
        return done(null,false,{message:"Incorrect username."});
      }
      if(user[0].password!=password){
        return done(null,false,{message:"Incorrect password."});
      }
      return done(null,user,{message:"data valid"});
    });
  }
));

passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(id,done){
  console.log("..passport...deserializeUser",id)
  Users_api.login({'_id':id[0]._id},function(err,user){
    console.log("..ghello",err);
    console.log("..oo o hello",user);
    done(err,user);
  });
});

module.exports=passport;