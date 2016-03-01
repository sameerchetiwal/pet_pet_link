myApp.controller('home_controller',function($scope,$state,$http,$rootScope,getCategory,Upload){
	$rootScope.disp=true;
	$scope.show=true;
	var count=0;
	var postCount,postCountCat=0;
	$scope.cat=false;
	$http.get('posts/post_count').then(function(response){
		postCount=response.data.length;
		$scope.postCount=postCount;
		$scope.postCountCat=postCountCat;
		console.log("posts",postCount,"postCountCat",postCountCat);
	});
	function featured(){
		$http.get('posts/favourites').then(function(response){
			$scope.favourites=response.data;
			console.log($scope.favourites);
		});
	}
	$scope.fav=false;
	function getCategories(){
	getCategory.categories(function(err,data){
		if(err){
			console.log(error);
		}
		else{
			$scope.categories=data;
		}
	});
}
	$scope.unfilter=function(){
	    $http.get('posts/get_post').then(function(response){
		$scope.posts=response.data;
		postCountCat=0
		});
	};
	$scope.filterCategory = function(category){
		console.log("aaabbb",category);
		$http.get('posts/get_post/category/'+category).then(function(response){
			$scope.posts=response.data;
			console.log("ffffffffffff",response.data)
		});

		$http.get('posts/post_count/'+category).then(function(response){
		postCountCat=response.data.length;
		$scope.postCountCat=postCountCat;
		console.log("postCountCat",postCountCat);
		$scope.cat=true;
	});
	};

	$scope.filterByFlag = function(){
		console.log("aaabbb");
		$http.get('posts/get_post/flagged').then(function(response){
			$scope.posts=response.data;
			console.log("ffffffffffff",response.data)
		});
	};

	$scope.like=function(post){
		$http.put('posts/like',{"_id":post._id}).then(function(response){
			post.likeCount++;
		});
	};
	$scope.unlike=function(post){
		$http.put('posts/unlike',{"_id":post._id}).then(function(response){
			post.unlikeCount++;
		});
	};
	$scope.nav=function(x){
		if(count<0){
			count=0;
		}
		if(x=='1'){
			if(Math.abs(postCount-count)>10){
				count+=10;
			}
			else{
				$scope.next=true;
			}
			console.log("count++",count);
		}
		if(x=='0'){
			count-=10;
			console.log("aaaa",count)
		}
		if(count>=0){
			$http.get('posts/get_posts/nav/'+count).then(function(response){
				console.log("count",count);
				console.log(response.data);
				$scope.posts=response.data;
			});
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

	$scope.flag=function(post){
		var userId=window.localStorage.getItem("userId");
		console.log("userId",userId,"postId",post._id);
		$http.put('posts/flag/'+post._id,{"_id":userId}).then(function(response){
			if(response.data){
				console.log(response.data);
				post.flagCount++;
			}
		});
	};

	$scope.favourite=function(post){
		$http.put("posts/favourite/"+post._id,{"favourite":!post.favourite}).then(function(response){
			if(response.data){
				console.log(response.data);
				console.log(post.favourite); 
				post.favourite=!post.favourite;
				featured();
			}
		})
	}

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

    $scope.latestFirst=function(){
    	 $http.get('posts/latest_first').then(function(response){
    	 	console.log("aaaaaaaaaabbbbbbbbbb",response.data);
    	 	$scope.posts=response.data;
    	 });
    	}


	console.log("flag",$scope.string);
	featured();
	getCategories();
	$scope.unfilter();

});