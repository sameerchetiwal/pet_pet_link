var user=require('./user_schema.js');
var category=require('./category_schema.js')
var mongoose = require('mongoose');
module.exports.userdata={

	register: function(data,callback){
		console.log(data);
		var id = mongoose.Types.ObjectId();
		data.verificationCode = id;
		data.verified=false;
		user.create(data,function(error,data1){
			if(data1==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data1);
				callback(null,data1);
			}
		});
	},

	verify: function(data1,data2,callback){
		user.update({"verificationCode":data1},data2,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data);
				callback(null,data);
			}
		});
	},

	login:function(data,callback){
		user.find(data,function(error,data1){
			if(data1==null||error){
				callback(error,null);
			}
			else{
				callback(null,data1);
			}
		});
	},

	forgotPassword: function(data,callback){
		user.find(data,function(error,data1){
			if(data1==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data1);
				callback(null,data1);
			}
		});
	},
	
	resetPassword: function(data1,data2,callback){
		user.update(data1,data2,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data,"password changed successfully");
				callback(null,data);
			}
		});
	},


	changePassword: function(data1,data2,callback){
		user.update(data1,data2,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data,"password changed successfully");
				callback(null,data);
			}
		});
	},

	getCategory: function(data1,callback){
		category.find(data1,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data);
				callback(null,data);
			}
		});
	},

	addCategory: function(data1,callback){
		category.create(data1,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data);
				callback(null,data);
			}
		});
	},

	getUser: function(filter,callback){
		user.find(filter,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data);
				callback(null,data);
			}
		});
	},

	updateUser: function(filter,data,callback){
		user.update(filter,{$set:data},function(error,data1){
			if(data1==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data1);
				callback(null,data1);
			}
		});
	},


	deleteCategory: function(filter,callback){
		console.log("bbbbbbbbbb");
		category.remove(filter,function(error,data){
			if(data==null||error){
				console.log("error has occured",error);
				callback(error,null);
			}
			else{
				console.log(data);
				callback(null,data);
			}
		});
	}
}