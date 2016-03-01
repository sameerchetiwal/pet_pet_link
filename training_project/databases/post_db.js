var posts=require('./post_schema.js');
var mongoose=require('mongoose');

module.exports.postdata={

	insertPost: function(data1,callback){
		posts.create(data1,function(error,data){
			if(data==null||error){
				callback(error,null);
			}
			else{
				callback(null,data);
			}
		});
	},

	getPost: function (filter,fields,options,callback){
		posts.find(filter,fields,options).limit(10)
		.populate('postedBy')
		.populate({path:'comments',populate:{path:'creator'}})
		.exec(function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,data);
			}
		});
	},

	like: function(filter,fields,callback){
		posts.update(filter,{$inc:{"likeCount":1}},function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(error,data);
			}
		});
	},

	unlike: function(filter,fields,callback){
		posts.update(filter,{$inc:{"unlikeCount":1}},function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(error,data);
			}
		});
	},

	addComment: function(filter,changes,callback){
		console.log("i am here!")
		posts.update(filter,{$push:{comments:changes},$inc:{"commentCount":1}},function(error,data1){
			if(error){
				callback(error,null);
			}
			else{
				callback(error,data1);
			}
		});
	},

	getAllPosts: function (filter,fields,options,callback){
		posts.find(filter,fields,options,function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,data);
			}
		});
	},

	deletePost: function (filter,callback){
		posts.remove(filter,function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,data);
			}
		});
	},


	flag: function(filter,data,callback){
		console.log("i am here!",data)
		posts.update(filter,{$push:{"flagBy":data},$inc:{"flagCount":1}},function(error,data1){
			if(error){
				callback(error,null);
			}
			else{
				callback(error,data1);
			}
		});
	},


	favourite: function(filter,data,callback){
		posts.update(filter,{$set:data},function(error,data2){
			if(error){
				callback(error,null);
			}
			else{
				callback(error,data2);
			}
		});
	},

	deleteCategory: function(filter,callback){
		console.log("bbbbbbbbbb");
		posts.remove(filter,function(error,data){
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

	latestFirst: function (filter,fields,options,callback){
		posts.find(filter,fields,options).sort({"createdOn":-1})
		.populate('postedBy')
		.populate({path:'comments',populate:{path:'creator'}})
		.exec(function(error,data){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,data);
			}
		});
	},



}