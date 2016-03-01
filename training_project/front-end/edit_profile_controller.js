myApp.controller('edit_profile_controller',function($scope,$state,$http,getCategory,getUser,$rootScope,likeService){
$rootScope.disp=true;
var user,userInfo;
var userId=window.localStorage.getItem("userId");

    getUser.getUserInfo(userId,function(err,data){
		if(err){
			console.log(error);
		}
		else{
			user=data[0];
			$scope.user=user;
			console.log("aaaaaaaaaaaaa");
		}
	});
	
	getCategory.categories(function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.categories=data;
		}
	});
	
	$scope.save=function(){
		$http.put('users/update/'+userId,user).then(function(response){
			if(response.data){
				console.log("xxxxxx",response.data);
				$scope.show="Changes Saved Successfully!";
			}
			else{
				$scope.show="Changes could not be saved!";
			}
		});
	};
	
});