var express=require('express');
var router=express.Router();
var userPost=require("../databases/post_db").postdata;
var mongoose=require('mongoose');

router.post('/new_post',function(req,res,next){
	userPost.insertPost(req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});


router.get('/get_post',function(req,res,next){
	userPost.getPost({},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
	
		}
	});
});

router.get('/get_post/:postId',function(req,res,next){
	userPost.getPost({"_id":req.params.postId},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});


router.get('/get_post/id/:id',function(req,res,next){
	userPost.getPost({"postedBy": req.params.id},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});


router.get('/get_post/category/:category',function(req,res,next){
	console.log("..helo",req.params.category)
	userPost.getPost({"catType": req.params.category},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/get_post/:id/:category',function(req,res,next){
	console.log("..helo",req.params.category,req.params.id)
	userPost.getPost({"catType":req.params.category,"postedBy":req.params.id},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.put('/like',function(req,res,next){
	userPost.like(req.body,{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			userPost.getPost({},{},{},function(error,data1){
				if(error){
					res.send(error);
				}
				else{
					res.send(data1);
				}
			});
		}
	});
});

router.put('/unlike',function(req,res,next){
	userPost.unlike(req.body,{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			userPost.getPost({},{},{},function(error,data1){
				if(error){
					res.send(error);
				}
				else{
					res.send(data1);
				}
			});
		}
	});
});

router.get('/get_posts/nav/:count',function(req,res,next){
	userPost.getPost({},{},{skip:parseInt(req.params.count)},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});


router.put('/add_comment/:postId',function(req,res,next){
	console.log("abcdef");
	userPost.addComment({"_id":req.params.postId},req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/get_comments/:postId',function(req,res,next){
	console.log("abcdef");
	userPost.getPost({"_id":req.params.postId},{comments: 1},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/post_count',function(req,res,next){
	userPost.getAllPosts({},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
	
		}
	});
});

router.get('/post_count/:category',function(req,res,next){
	userPost.getAllPosts({"catType":req.params.category},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
	
		}
	});
});

router.get('/post_count/:userId/:category',function(req,res,next){
	userPost.getAllPosts({"postedBy":req.params.userId,"catType":req.params.category},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
	
		}
	});
});

router.delete('/delete/:postId',function(req,res,next){
	userPost.deletePost({"_id":req.params.postId},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.put('/flag/:postId',function(req,res,next){
	console.log("userId",req.body);
	userPost.flag({"_id":req.params.postId},req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/get_post/flagged',function(req,res,next){
	userPost.getPost({flagCount:{$gt:0}},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			console.log("aaaaaaaAAAAA",data)
			res.send(data);
	
		}
	});
});

router.put('/favourite/:postId',function(req,res,next){
	console.log("postId",req.body);
	userPost.favourite({"_id":req.params.postId},req.body,function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
		}
	});
});

router.get('/favourites',function(req,res,next){
	userPost.getAllPosts({"favourite":true},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			console.log("aaaaaaaAAAAA",data)
			res.send(data);
	
		}
	});
});

router.get('/favourites/:userId',function(req,res,next){
	userPost.getAllPosts({"postedBy":req.params.userId,"favourite":true},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			console.log("aaaaaaaAAAAA",data)
			res.send(data);
	
		}
	});
});

router.delete('/delete_category/:catType',function(req,res,next){
	userPost.deleteCategory({"catType":req.params.catType},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
			console.log("aaaaaaaaaavvvvvvvv",data)
		}
	});
});


router.get('/latest_first',function(req,res,next){
	userPost.latestFirst({},{},{},function(error,data){
		if(error){
			res.send(error);
		}
		else{
			res.send(data);
	
		}
	});
});

module.exports = router;