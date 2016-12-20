angular.module('app.controllers', ['firebase'])

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

.controller('liveDealsCtrl', ['$scope', '$http', '$location', 'NgMap', '$stateParams', '$cordovaGeolocation', '$ionicPlatform', 'RestaurantFactory',
'firebase' ,  '$firebaseArray',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $location, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory, firebase, $firebaseArray) {
'use strict'

	var main = this;

	/*$scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('search').blur();
    });
  };*/

	main.types = "['address']";
	  main.placeChanged = function() {
		  console.log(main.address);

	  }

	$scope.chosenPlace = "";
	$scope.restaurants = [];
	$scope.restaurant = $scope.restaurants[0];
	$scope.lat = "";
	$scope.long = "";
	$scope.mapOptions = {zoom: 16};
	var ref = firebase.database().ref();
	$scope.rests = $firebaseArray(ref);

	$scope.newRests = {};

//get current coords and bind them to scope/////////////////////////////////////////////////////////////
	$ionicPlatform.ready(function(){

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
$scope.l = [];
	var getCoordsFromAddress = function(address){


var y = $scope.returnCoords;
return y;

	}

//show info window/////////////////////////////////////////////////////////////////////////////////////
	  $scope.showDetail = function(e, restaurant) {
				$scope.restaurant = restaurant;
				main.map.showInfoWindow('iw', restaurant.id);
	  };

	NgMap.getMap().then(function(map) {
		//get DOM of map
		main.map = map;
	});



//////////////////////////////DUEL CONTROLLER TO BIND TO THE RESTERAUNT ACCOUNT VIEW TEMPLATE//////////////////////////////
	main.newRestaurant = {id:"", name:"", address:"", type:"", email:"", phone:"", coords:""};


	main.addRestaurant = function(){

			var url = "http://maps.google.com/maps/api/geocode/json?address=" + $scope.newRests.address;

				$http({
					method: 'GET',
					url: url
				}).then(function successCallback(response) {

					var releventMapData = response.data.results[0];

					var searchedreleventMapData_lat = releventMapData.geometry.location.lat;
					var searched_lat = releventMapData.geometry.location.lat;
					var searched_long = releventMapData.geometry.location.lng;

					$scope.newRests.coords = [searched_lat, searched_long];
					$scope.newRests.id = "1";
					$scope.rests.$add({id:$scope.newRests.id,
														name:$scope.newRests.name,
														address:$scope.newRests.address,
														type:$scope.newRests.type,
														email:$scope.newRests.email,
														phone:$scope.newRests.phone,
														coords:$scope.newRests.coords,
														deals:[{startDate:"", endDate: "", dealDetails: "", numberOfDeals:"", conditions:"", uptake:""}],
														images:[{image1:"", image2:"", image3:""}],
														currentDeal : true
													});



				});
//////////////////////////////DUEL CONTROLLER TO BIND TO THE RESTERAUNT ACCOUNT VIEW TEMPLATE//////////////////////////////
$scope.newDeal = {};
	main.addDeal = function(){
		console.log("newDeal");
	}
				$location.path('/page103');
		};


	main.updateRestaurant = function(){
		//RestaurantFactory.updateRestaurant(restaurant);
	};
	main.removeRestaurant = function(restaurant){
	//	RestaurantFactory.removeRestaurant(restaurant);
	};
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


}]);
