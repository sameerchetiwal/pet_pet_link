myApp.controller('login_controller',function($scope,$state,$http,$rootScope){
	if(window.localStorage.getItem("email")){
		$state.go('home');
	}
	$rootScope.disp=false;
	var valid=false;
	$scope.login=function(){
		if($scope.email == null){
			$scope.emailResponse = "please enter a valid e-mail address";
			$scope.password=null;
			return 0;
		}
		
		if($scope.password == null){
			$scope.passwordResponse = "please enter a password";
			$scope.emailResponse = null;
			return 0;
		}
		$scope.emailResponse = null;
		$scope.passwordResponse = null;
		var userData={"email":$scope.email,"password":$scope.password};
		$http.post('users/login',userData).then(function(response){
			valid=!!response.data;
			if(!valid){
				$scope.notify="Username and password did not match!";
				return 0;
			}
			else{
				window.localStorage.setItem("userId",response.data[0]._id)
				$rootScope.userId=response.data[0]._id;
				console.log($rootScope.userId);
				$state.go('home');
				window.localStorage.setItem("email",$scope.email);
				valid=false;
			}
		});
	}
});