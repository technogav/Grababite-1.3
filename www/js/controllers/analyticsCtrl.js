angular.module('analyticsController', ['firebase'])//may not need to inject firebase here

.controller('analyticsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location','$ionicSideMenuDelegate',
function ($scope, $stateParams, RestaurantFactory, $location, $ionicSideMenuDelegate) {
	
	//console.log("analyticsCtrl");
	$scope.$on("$ionicView.beforeEnter", function(){
		
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
		}
	});
	$scope.x = function(searchDate){
		//console.log("fire");
		$scope.analyticsSearchDate = RestaurantFactory.setAnalyticsSearchDate(searchDate);
		
		$location.path('/analyticsByDate');
		
	}
	
	$scope.deals = RestaurantFactory.getDeals();//console.log($scope.deals);
	
	$scope.start = "";
	$scope.searchByDateRange = function(){
		console.log("$scope.start");
		console.log("$scope.end");
		if(($scope.start != null) && ($scope.end != null)){
			var range = [$scope.startOfRange,$scope.endOfRange];
			$scope.analyticsByDateRange = RestaurantFactory.setAnalyticsByDateRange(range);
		}else{ 
			alert("please enter both start and end dates to search by date RANGE");
			
		}
		
	}
	
	$scope.startOfRange = null;
	$scope.endOfRange = null;
	
	$scope.setStart=function(start){
		$scope.startOfRange = start;
		if(($scope.startOfRange != null) && ($scope.endOfRange != null)){
			var range = [$scope.startOfRange,$scope.endOfRange];
			$scope.analyticsByDateRange = RestaurantFactory.setAnalyticsByDateRange(range);
			console.log($scope.startOfRange + "is set");
			
		}else{
			alert("please ensure you have picked the end date for the range");
		}
			
		
	}
	$scope.setEnd = function(end){
		$scope.endOfRange = end;
		
		if(($scope.startOfRange != null) && ($scope.endOfRange != null)){
			var range = [$scope.startOfRange,$scope.endOfRange];
			$scope.analyticsByDateRange = RestaurantFactory.setAnalyticsByDateRange(range);
			console.log($scope.startOfRange + "is set");
			
		}else{
			alert("please ensure you have picked the end date for the range");
		}
	}
	
	$scope.deals = RestaurantFactory.getDeals();
	$scope.dealsByDate = [];
	$scope.dealsByDateRange = [];
	$scope.searchByDealName = [];
	
		//console.log($scope.deals);
	$scope.searchByDate = function(){
		console.log("$scope.deals");
		angular.forEach($scope.deals, function(value){
			console.log(value);
			if(value.startDate >= $scope.searchDate){
				$scope.dealsByDate ="value";
				console.log(value)
				RestaurantFactory.setDealAnalyticsByDate($scope.dealsByDate);
			}
		});
		//$scope.dealsByDate = RestaurantFactory.getDealAnalyticsByDate();
	console.log($scope.dealsByDate);
		
	};
	
	$scope.searchByDateRange = function(){
		//get a date range picker here to ensure that both start and end dates are set
		angular.forEach($scope.deals, function(value){
			if((value.startDate >= $scope.startDate) && (value.endDate <= $scope.endDate)){ //no end date in the database
				$scope.dealsByDateRange.push(value);
				RestaurantFactory.setDealAnalyticsByRange($scope.dealsByDateRange);
			}
		});
	};
	
	$scope.searchByDealName = function(){
		angular.forEach($scope.deals, function(value){
			if(value.deal_name === $scope.dealName){
				$scope.dealsByDateRange.push(value);
				RestaurantFactory.setDealAnalyticsByName($scope.searchByDealName);
			}
		});
		
	};
	
	
}])

.controller('analyticsByDateCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.analByDate = RestaurantFactory.getDealAnalyticsByDate();
		$scope.dateFor = RestaurantFactory.getDateFor();
	
	});
	
	
}]);