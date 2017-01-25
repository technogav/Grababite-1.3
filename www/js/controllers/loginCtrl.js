angular.module('LoginCtrl', ['firebase'])//may not need to inject firebase here

.controller('LoginCtrl', ['$scope', '$stateParams', 'accountFactory', '$location',
function ($scope, $stateParams, accountFactory, $location) {
	"use strict";
	console.log("login controller");
	
	
	$scope.y = function(data){
		
		if(accountFactory.initVariables(data.username)){
			console.log(true);
		}
		$scope.customers = accountFactory.getCustomers();
		//console.log($scope.customers);
		$scope.user = [];
		
		for(var i = 0; i < $scope.customers.length; i++){
			//console.log($scope.customers[i].account_name);
			
			if((data.username = $scope.customers[i].account_name) && (data.password === $scope.customers[i].password1)){
				$scope.user = $scope.customers[i];
				//console.log($scope.user);
				//set current user to the accountFactory
				accountFactory.setCurrentUser($scope.user);
				
				break;
			}else{
				alert("sorry password did not match. Try again or make new account? (links to new account view)");
			}
		}
		//console.log($scope.user.account_type);
		if($scope.user.account_type == 'restaurant'){
			//console.log('here');
			$location.path('/page201/page100');
		}else{
			$location.path('/page1/page3');
		}
	
	}
	
	$scope.accountType = function(){
		//console.log("sdkfjdfs");
		$location.path('/custOrRest');
	}
	   

	
	
	
	
}]);