var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/user_database');
var userSchema=mongoose.Schema(
{
	firstName: {type:String, required:true,},
	lastName: {type:String},
	userName: {type:String, required:true, unique:true},
	sex: {type:String, required:true,},
	email: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	description: {type:String},
	verificationCode: {type:mongoose.Schema.Types.ObjectId},
	verified: {type:Boolean},
	resetPassToken: {type:String},
	role: {type:String}
},{collection:'userData'});

var userData=mongoose.model('userData',userSchema);
module.exports=userData;

