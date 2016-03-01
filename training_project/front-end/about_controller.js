myApp.controller('about_controller',function($scope,$state,$http,$rootScope,$stateParams,getCategory,getUser){
	$rootScope.disp=true;
	var userId=window.localStorage.getItem("userId");
	getUser.getUserInfo(userId,function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.user=data[0];
			console.log($scope.user);
		}
	});
});