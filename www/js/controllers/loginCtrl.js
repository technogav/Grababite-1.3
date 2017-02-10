angular.module('LoginCtrl', ['firebase'])//may not need to inject firebase here

.controller('LoginCtrl', ['$scope', '$stateParams', 'accountFactory', '$location', '$ionicSideMenuDelegate',
function ($scope, $stateParams, accountFactory, $location, $ionicSideMenuDelegate) {
	"use strict";
	
	$scope.$on("$ionicView.beforeEnter", function(){
		
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
		}
	});

	$scope.checkLogin = function(data){
				
		$scope.user = [];
		
		var checkUsername = function(data){
			$scope.customers = accountFactory.getCustomers();
			//console.log($scope.customers);
			for(var i = 0; i < $scope.customers.length; i++){				
				if(data.username === $scope.customers[i].account_name){
					//console.log($scope.customers[i].account_name);		
					$scope.user = $scope.customers[i];
					break;				
				}
			}
		};
		
		checkUsername(data);
		
		var checkPassword = function(data){

			if($scope.user.password1 === data.password){
				//console.log($scope.user);
				accountFactory.setCurrentUser($scope.user);//find a new way to set the current user
				if($scope.user.account_type == 'restaurant'){
					//send username to create deals, current deal etc if user is a restaurant
					//console.log(data.username);
					accountFactory.initVariables(data.username);
					$location.path('/page201/page100');
				}else{
					$location.path('/page1/page3');
				}
			}else{
				alert("sorry password did not match. Try again or make new account? (links to new account view)");
				
			}
		//console.log($scope.user.account_type);
		}
		
		checkPassword(data);
	}
	
	$scope.accountType = function(){
		$location.path('/custOrRest');
	}
	   

	
	
	
	
}]);