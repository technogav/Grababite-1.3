angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myAccountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('liveDealsCtrl', ['$scope', '$http', 'NgMap', '$stateParams', '$cordovaGeolocation', '$ionicPlatform', 'RestaurantFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory) {
'use strict';
	var main = this;

	
	main.types = "['address']";
	  main.placeChanged = function() {
		  console.log('placeChanged()');
		  
		main.place = this.getPlace();
		  console.log('getPlace()');
		console.log('location', main.place.geometry.location);
		main.map.setCenter(main.place.geometry.location);
	  }
	
	
	
	
	
	$scope.chosenPlace = "";
	$scope.restaurants = "";
	$scope.restaurant = $scope.restaurants[0];
	$scope.lat = "";
	$scope.long = "";
	$scope.mapOptions = {
			zoom: 16		
	};
	

	  
	  
	  
	
	
	
//get current coords and bind them to scope/////////////////////////////////////////////////////////////
	$ionicPlatform.ready(function(){
		$scope.restaurants = RestaurantFactory.getRestaurants();
		var posOptions = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {

					$scope.lat = position.coords.latitude;console.log($scope.lat);
					$scope.long = position.coords.longitude;

				
		}, function(err) {
			console.log(err.message);
		});
		
	});
	
	
//when coords change panTo the new center//////////////////////////////////////////////////	
	$scope.onMapIdle = function() {
			var updateCenter = function() {
			var ll = new google.maps.LatLng($scope.lat, $scope.long);
			$scope.myMap.panTo(ll);

			};
		$scope.$watch('lat', updateCenter);
		$scope.$watch('long', updateCenter);
	};
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.$watch(main.address, main.placeChanged);
	
	
	
	
//CHECK INPUT AGAINST DATABASE//////////////////////////////////////////////////////////////////////
	$scope.searchByName = function(search){
		var search = angular.copy(search);
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
	
	
//use input address or name to get new coords and apply them to scope//////////////////////////////////////////
	$scope.repositionMap = function(){
		
		var search = angular.copy($scope.chosenPlace);
		console.log(search);
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
	
}

])
   
.controller('myReservationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('reserveTableCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('refineYourSearchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tableBookedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('dealsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pleaseTryAgainCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('bookingDetailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('welcomeToGrababiteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

//RESTAURANT CONTROLLERS/////////////////////////////////////////////////////////////////////

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
	$scope.restaurantName = '';
	$scope.restaurantAddress = '';
	$scope.restaurantDetails = '';
	$scope.restaurantEmail = '';
	$scope.verifyID = '';

}]);
 