myApp.controller('forgot_controller',function($scope,$state,$http){
$scope.show=false;
$scope.forgot=function(){
	if($scope.email==null)
	{
		$scope.showError="Please enter your e-mail id";
		return 0;
	}
	$scope.showError=null;
	var email={"email":$scope.email};
	$http.post("users/forgot_password",email).then(function(response){
		console.log(response.data);
		if(!response.data)
		{
			$scope.showError="Sorry, but you do not have this e-mail id registered with us!"
		}
		else{
			$scope.show=true;
		}
	});
}
$scope.close=function(){
	$scope.show=false;
}
});
