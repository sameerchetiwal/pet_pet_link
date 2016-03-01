myApp.controller('new_post_controller',function($scope,$state,$http,getCategory,$rootScope,Upload){
	var userId=window.localStorage.getItem("userId");
	var postId;
	$rootScope.disp=true;
	getCategory.categories(function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.x=data;
		}
	});
	$scope.post=function(){
		if($scope.title==null)
		{
			$scope.show="You cannot leave the title empty!";
			return 0;
		}
		var createdOn=new Date();
		console.log(createdOn);
		var postData={"postedBy":userId,"title":$scope.title,"catType":$scope.sel,"postImage":$scope.path,"createdOn":createdOn,"likeCount":0,"unlikeCount":0,"commentCount":0,"flagCount":0,"favourite":false};
		console.log(postData);
		$http.post('posts/new_post',postData).then(function(response){
			postId=response.data._id;
			console.log(response.data.createdOn);
			if(!!postId){
				$scope.show="Post submitted successfully!";
			}
			else{
				$scope.show="Post could not be submitted!";
			}
		});
	};

	$scope.upload = function (file) {
        console.log(file);
        Upload.upload({
            url: 'upload/url',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success '  + resp.data);
            $scope.path=resp.data
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});
