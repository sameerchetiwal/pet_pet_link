myApp.controller('my_profile_controller',function($scope,$state,$http,getCategory,getUser,$rootScope,likeService){

$rootScope.disp=true;
$scope.show=true;
var postCountCat=0;
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
	
    function getCategories(){
    	console.log("aaaaaaaaaaaAAA");
    	getCategory.categories(function(err,data){
    		if(err){
    			console.log(error);
    		}
    		else{
    			console.log("AAAAAAAAAA",data);
    			$scope.categories=data;
    		}
    	});
    }
	$scope.unfilter=function(){
	    $http.get('posts/get_post/id/'+userId).then(function(response){
		$scope.posts=response.data;
		});
	};
	// $scope.filterCategory = function(category){
	// 	$http.get('posts/get_post/'+userId+'/'+category).then(function(response){
	// 		$scope.posts=response.data;
	// 	});
	// };

	$scope.filterCategory = function(category){
		console.log("aaabbb",category);
		$http.get('posts/get_post/'+userId+'/'+category).then(function(response){
			$scope.posts=response.data;
			console.log("ffffffffffff",response.data)
		});

		$http.get('posts/post_count/'+userId+'/'+category).then(function(response){
		postCountCat=response.data.length;
		$scope.postCountCat=postCountCat;
		console.log("postCountCat",postCountCat);
		$scope.cat=true;
	});
	};

	function featured(){
		console.log("featured");
		$http.get('posts/favourites/'+userId).then(function(response){
			$scope.favourites=response.data;
			console.log($scope.favourites);
		});
	};

	$scope.removeCategory=function(category){
		if(confirm("Are you sure you want to remove this category")==true){
			$http.delete('users/delete_category/'+category._id).then(function(response){
				if(response.data){
					console.log(response.data,"category removed");
				}
			});
			$http.delete('posts/delete_category/'+category.catType).then(function(response){
				if(response.data){
					console.log(response.data);
					getCategories();
					featured();
					$scope.unfilter();
				}
			});
		}
		else {
			$scope.unfilter();
		}
	};

	$scope.addCat=function(){
		var newCategory=$scope.newCategory.toUpperCase();
		console.log(newCategory);
		$http.post('users/add_category',{"catType":newCategory,"catImage":$scope.path}).then(function(response){
			$scope.addNew=false;
			getCategories();
		});
	}

	$scope.like=function(post){
		likeService.like(post._id,function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log("liked");
			}
		});
		post.likeCount++;
	};
	$scope.unfilter();
	featured();
	getCategories();
});