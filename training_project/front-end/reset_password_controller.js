myApp.controller('reset_password_controller',function($scope,$state,$http,$stateParams){
	$scope.reset=function(){
		if($scope.password==null)
		{
			$scope.show="Please enter a password";
			return 0;
		}
		if($scope.cnfPassword==null)
		{
			$scope.show="Please confirm password the password";
			return 0;
		}
		if($scope.password!=$scope.cnfPassword){
			$scope.show="Passwords did not match!";
			return 0; 
		}
		
		var email=$stateParams.email;
		console.log($stateParams.email);
		var password={"password":$scope.password};
		$http.post("users/reset_password/"+email,password).then(function(response){
			if(response.data){
				$scope.show="Password changed successfully!";
				$scope.password=null;
				$scope.cnfPassword=null;
				return 0;
			}
			else{
				$scope.show="Password could not be changed!";
				$scope.password=null;
				$scope.cnfPassword=null;
				return 0;
			}
		});
		return 0;
	}
});