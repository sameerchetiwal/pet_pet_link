myApp.controller('index_controller',function($scope,$state,$http,$rootScope,getUser){

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
	$scope.logout=function(){
	window.localStorage.removeItem("email");
}
});
