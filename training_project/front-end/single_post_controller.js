myApp.controller('single_post_controller',function($scope,$state,$http,$rootScope,$stateParams,getCategory){
	$rootScope.disp=true;
	var postId = $stateParams.postId;
	console.log("postId",postId);
	var limit=true;
	$scope.viewMore=function(){
		limit=false;
		get();
	};
	var get=function(){
		$http.get('posts/get_post/'+postId).then(function(response){
			$scope.post=response.data[0];
			console.log("aaaaaaaaaaaaaaaa",response.data[0]);
			$scope.comments = $scope.post.comments;
			if(limit){
				$scope.comments=$scope.comments.slice(-5);
			}
		});
	}

	$scope.submitComment=function(){
		var userId=window.localStorage.getItem("userId");
		console.log("hello",userId);
		var commentText=$scope.commentText;
		console.log(commentText);
		var comment={"creator":userId,"createdOn":Date(),"comment":commentText};
		$http.put('/posts/add_comment/'+postId,comment).then(function(response){
			$scope.post.comments.push(comment);
			get();
			console.log(response.data);
			$scope.commentText=null;
		});
	};

	$scope.delete=function(postId){
		$http.delete('posts/delete/'+postId).then(function(response){
			if(response.data){
				console.log("post deleted",response.data);
				$state.go('home');
			}
		});
	};
	get();
});