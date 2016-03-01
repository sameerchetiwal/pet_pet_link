myApp.service('getCategory',function($http){
	this.categories=function(callback){
	$http.get('users/get_categories').then(function(response){
	var result=response.data;
	callback(null,result);
	});
};
});

myApp.service('getPost',function($http){
	this.post=function(postId,callback){
	$http.get('users/get_post/'+postId).then(function(response){
		var result=response.data;
		callback(null,result);
	});
};
});

myApp.service('likeService',function($http){
	this.like=function(postId,callback){
		console.log("cccccc",postId);
		$http.put('posts/like',{"_id":postId}).then(function(response){
			if(response.data){
				callback(null,response.data);
			}
		});
	};
});

myApp.service('getUser',function($http){
	this.getUserInfo=function(userId,callback){
		console.log("cccccc",userId);
		$http.get('users/get_user/'+userId).then(function(response){
			if(response.data){
				callback(null,response.data);
			}
		});
	};
});

myApp.controller('services',function($scope,getCategory){
	getCategory.categories(function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.show=data;
		}
	});

	getPost.post(function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.show=data;
		}
	});

	likeService.like(postId,function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.show=data;
		}
	});

	getUser.getUserInfo(userId,function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.show=data;
		}
	});

});