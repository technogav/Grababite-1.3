angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

}])

.controller('liveDealsCtrl', ['$scope', '$http', '$location', 'NgMap', '$stateParams', '$cordovaGeolocation', '$ionicPlatform', 'RestaurantFactory',
							  
function ($scope, $http, $location, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory) {
'use strict';

	var main = this;
//initalise variables
	$scope.chosenPlace = "";
	$scope.lat = "";
	$scope.long = "";	
	$scope.deals = RestaurantFactory.getAllRestaurants();
	$scope.loggedInName = "Gavins Grub";
	
//fetch all restaurants from firebase
	$scope.rests = RestaurantFactory.getAllRestaurants();

//FUNCTION: get current coords and bind them to scope/////////////////////////////////////////////////////////////
	$ionicPlatform.ready(function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
					$scope.lat = position.coords.latitude;
					$scope.long = position.coords.longitude;
		}, function(err) {
			console.log(err.message);
		});

	});

//FUNCTION : when coords change panTo the new center/////////////////////////////////////////////////////////////
	$scope.onMapIdle = function() {
			var updateCenter = function() {
			var ll = new google.maps.LatLng($scope.lat, $scope.long);
			$scope.myMap.panTo(ll);

			};
		$scope.$watch('lat', updateCenter);
		$scope.$watch('long', updateCenter);
	};

//FUNCTION: check input against database/////////////////////////////////////////////////////////////////////////
	$scope.searchByName = function(search){
		//var search = angular.copy(search);
		console.log(search);
		/*for(var i=0;i<$scope.restaurants.length; i++){
			if((search.toLowerCase()) === ($scope.restaurants[0].name.toLowerCase())){
				var coords = $scope.restaurants[i].coords;
				$scope.lat = coords[0];
				$scope.long = coords[1];

				break;
			}

		}*/
		return false;

	};

//FUNCTION: use input address or name to get new coords//////////////////////////////////////////
	$scope.repositionMap = function(){

		var search = angular.copy($scope.chosenPlace);
		
		//call searchbyName function to set coords if name in database////
		if($scope.searchByName(search)){
			console.log(search);

		}else{
			var url = "http://maps.google.com/maps/api/geocode/json?address=" + search;
			console.log('here');
				$http({
					method: 'GET',
					url: url
				}).then(function successCallback(response) {
					var releventMapData = response.data.results[0];

					var searchedreleventMapData_lat = releventMapData.geometry.location.lat;
					var searched_lat = releventMapData.geometry.location.lat;
					var searched_long = releventMapData.geometry.location.lng;
					//scope lat and long are watched, so when they are changed a function will recenter the map
					$scope.lat = searched_lat;
					$scope.long = searched_long;

				}, function errorCallback(response) {
					console.log(response.message);
				});
		}
	};

//show info window/////////////////////////////////////////////////////////////////////////////////////
	$scope.showDetail = function(e, restaurant) {
				$scope.restaurant = restaurant;
				main.map.showInfoWindow('iw', restaurant.id);
	  };

	NgMap.getMap().then(function(map) {
		//get DOM of map
		main.map = map;
	});

//////////////////////////////random functions that need to be moved//////////////////////////////

/*	

	main.skip = function(){
			$location.path('/page201/page102');
	}
	main.skip2 = function(){
			$location.path('/page201/page100');
	}

	
	$scope.bookingDetails = function(){
		$location.path('/restaurantBookings');
	}
	
	$scope.myDeal = function(x){
		console.log(x);
		$location.path('/dealInfo');
		
	}
	
	 $scope.editDeal = [];
	 $scope.pastDealEdit = function(x){
			$scope.editDeal = x;
			$location.path('/page103');

	 }
	 

	main.removeDeal = function(deal){
	//	RestaurantFactory.removeRestaurant(restaurant);
			$scope.fbRestsObj.$loaded().then(function(data) {
					angular.forEach(data, function(value) {
					console.log(value.deals);
							angular.forEach(value.deals, function(value){
								if(value.deal_name == deal.deal_name){
									//console.log(value.deal_name);
								}

							});



							//console.log(value.deal_name);


				});
			});
	};*/


}])

.controller('dealsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	console.log("dealsCtrl controller");
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.historicalDeal = RestaurantFactory.getHistoricalDeals();console.log($scope.historicalDeal);

	});
	//initalise variables
	
	$scope.deals = RestaurantFactory.getDeals();//console.log($scope.deals);
	
	
	$scope.loggedInRestaurant = RestaurantFactory.getLoggedInRestaurant();//console.log($scope.loggedInRestaurant);
	$scope.currentDeal = RestaurantFactory.getCurrentDeal();//console.log($scope.currentDeal);
	
	
	//PROBLEM WITH DATA NOT UPDATING ON THE VIEW REF: templates/history.html
	$scope.pastDealEdit = function(deal){
		//set the deal to the service 
		RestaurantFactory.setDealToEdit(deal);
		$location.path('/page103');
	}
		
		
	
}])

.controller('analyticsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	
	console.log("mad world");
	
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
	console.log("the dreams in which im dying are the best ive ever had");
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.analByDate = RestaurantFactory.getDealAnalyticsByDate();
		$scope.dateFor = RestaurantFactory.getDateFor();
	
	});
	
}])

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$http', '$location',
function ($scope, $stateParams, RestaurantFactory, $http, $location) {
	$scope.newRest = [];
	
	
	$scope.addRestaurant = function(){

		var url = "http://maps.google.com/maps/api/geocode/json?address=" + $scope.newRest.address;

			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response) {

				var releventMapData = response.data.results[0];
				var searchedreleventMapData_lat = releventMapData.geometry.location.lat;
				var searched_lat = releventMapData.geometry.location.lat;
				var searched_long = releventMapData.geometry.location.lng;
				$scope.newRest.accountName = "Gavin";
				$scope.newRest.coords = [searched_lat, searched_long];
				$scope.newRest.deals = [{deal_name:"a"}];
				
				$scope.sendToService($scope.newRest);
			});
	};
	
	$scope.sendToService = function(newRest){
		
		RestaurantFactory.setRestaurant(newRest);//THIS WORKS
		alert("restaurant added"); //however it is brittle because there is no way to check if restaurant is actually added
		$location.path('/page201/page102');
	};

}])

.controller('editDealsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.dealToEdit = RestaurantFactory.getDealToEdit();

	});

	//FUNCTION: reactivate current deal by updateing the start date/ end date and resetting uptake to zero
	$scope.liveDeals = RestaurantFactory.getLiveDeals();
	
	console.log($scope.liveDeals);
	
	$scope.reactivateDeal = function(deal){
		RestaurantFactory.setEditdeal(deal);
 	};
	
	$scope.removeDeal = function(deal){
		RestaurantFactory.setRemoveDeal(deal);
	};
	
	$scope.editDeal = function(deal){
		
	}
	
	$scope.pastDealsEdit = function(deal){
		//set the deal to the service 
		RestaurantFactory.setDealToEdit(deal);
		$location.path('/editLiveDeal');
	}
	
	$scope.saveEdit = function(deal){
		console.log(deal);
		RestaurantFactory.setSaveDeal(deal);
	};

}])

.controller('newDealsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', 
function ($scope, $stateParams, RestaurantFactory) {
	
	"use strict";

	$scope.addNewDeal = function(newDeal){
		console.log(newDeal);
		RestaurantFactory.setAddNewDeal(newDeal);
	}
	
	
		
		
}])

.controller('customerSignUpCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	
	console.log("customerSignUpCtrl");
		
	$scope.newCust = [];

	$scope.newCustomer = function(newCust){
		console.log("newCust");
		RestaurantFactory.setCustomer(newCust);//THIS WORKS
		
		$location.path('/page1/page3');
	}
		
		
}]);


