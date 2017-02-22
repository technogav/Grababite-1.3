
angular.module('liveDealsController', ['firebase', 'ngMap'])

.controller('liveDealsController', ['$scope', '$http', '$location', 'NgMap', '$stateParams', '$cordovaGeolocation', '$ionicPlatform', 'RestaurantFactory', '$ionicSideMenuDelegate',
							  
function ($scope, $http, $location, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory, $ionicSideMenuDelegate) {
'use strict';
//console.log("liveDealsController");
	
	
	var main = this;
	
	$scope.$on("$ionicView.beforeEnter", function(){
		
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
			
		}
		$scope.restsWithCurrentDeal = RestaurantFactory.getRestsWithCurrentDeal();
		//console.log($scope.restsWithCurrentDeal);
		
	});
	$scope.$on("$ionicView.enter", function(){
			NgMap.getMap().then(function(map) {
				main.map = map;
		});
	});
//function to set the currentDeal in the RestaurantFactory provided the initVar(login) function has been fired off
	//RestaurantFactory.setCurrentDeal();
//initalise variables	
	$scope.rests = [];
	$scope.restsWithCurrentDeal = [];
	
	$scope.user = RestaurantFactory.getCurrentUser();

	main.user = $scope.user;
//fetch all restaurants from firebase
	$scope.rests = RestaurantFactory.getAllRestaurants();
	
	console.log($scope.restsWithCurrentDeal);
	
	//console.log($scope.rests);
	main.rest = $scope.rests[0];
//FUNCTION: get current coords and bind them to scope/////////////////////////////////////////////////////////////
	$ionicPlatform.ready(function(){
		var posOptions = {maximumAge:60000,timeout:3000,enableHighAccuracy:true};
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
					$scope.lat = position.coords.latitude;
					$scope.long = position.coords.longitude;
			$scope.rests = RestaurantFactory.getAllRestaurants();
			//console.log($scope.rests);
		}, function(err) {
			console.log(err.message);
		});

	});
	
	$scope.reserve = function(deal, restaurantUID, restaurant){
		//console.log(restaurant);	

		RestaurantFactory.setReserveDeal(deal, restaurantUID, restaurant);
		
		//next make new object and add time and reservation number
		//send to service where we can update the restaurant[index].deals[index] with new object //fbArray.$save(index)
		//send to service where we can update the customer logged in
		$location.path("/reserveTable");
	};

	$scope.showDetail = function(e, restaurant) {
		main.rest = restaurant;
		main.map.showInfoWindow('iw', restaurant.id);
		//RestaurantFactory.setReserveRestaurant(restaurant);
	};
	main.types = "['address']";
		
	main.placeChanged = function() {
			main.place = this.getPlace();
			//console.log(main.place);
			main.map.setCenter(main.place.geometry.location);
	}
  
	
 

}]);