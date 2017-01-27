angular.module('liveDealsController', ['firebase'])

.controller('liveDealsController', ['$scope', '$http', '$location', 'NgMap', '$stateParams', '$cordovaGeolocation', '$ionicPlatform', 'RestaurantFactory',
							  
function ($scope, $http, $location, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory) {
'use strict';
//console.log("liveDealsController");
	var main = this;
//initalise variables
	$scope.chosenPlace = "";
	$scope.lat = "";
	$scope.long = "";	
	$scope.deals = RestaurantFactory.getAllRestaurants();
	
	$scope.user = RestaurantFactory.getCurrentUser();

	main.user = $scope.user;
//fetch all restaurants from firebase
	$scope.rests = RestaurantFactory.getAllRestaurants();
main.rest = $scope.rests[0];
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
				main.rest = restaurant;
				main.map.showInfoWindow('iw', restaurant.id);
	  };

	NgMap.getMap().then(function(map) {
		//get DOM of map
		main.map = map;
	});

	$scope.reserve = function(deal, restaurantUID, restaurant){
		//console.log(restaurant);	

		RestaurantFactory.setReserveDeal(deal, restaurantUID, restaurant);
		
		//next make new object and add time and reservation number
		//send to service where we can update the restaurant[index].deals[index] with new object //fbArray.$save(index)
		//send to service where we can update the customer logged in
		$location.path("/reserveTable");
	};

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


}])// JavaScript Document