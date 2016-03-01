myApp.controller('register_controller',function($scope,$state,$http){
	$scope.register=function(){
		if($scope.userName==null||$scope.password==null||$scope.email==null||$scope.fName==null||$scope.lName==null){
			$scope.show="Please provide your complete details ";
			return 0;
		}
		if($scope.agree){
		var userData={"firstName":$scope.fName, "lastName":$scope.lName, "sex":$scope.sex, "userName":$scope.userName, "email":$scope.email, "password":$scope.password, "description":$scope.description}
		$http.post('users/register',userData).then(function(response){
			if(response.data){
				$scope.show="Registration Successfull!";
			}
			else{
				$scope.show="Registration Unsuccessfull!"
			}
		});
	}
	else{
		$scope.show="Please accept the terms and conditions!";
	}
	}
});