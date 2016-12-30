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
'firebase' ,  '$firebaseArray', '$firebaseObject',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $location, NgMap, $stateParams, $cordovaGeolocation, $ionicPlatform, RestaurantFactory, firebase, $firebaseArray, $firebaseObject) {
'use strict'
/*$SCOPE.RESTS GOT LOST SOMEWHERE SO NOW THE MAP MARKERS ARE NOT WORKING*/
	var main = this;

	$scope.chosenPlace = "";
	$scope.restaurants = [];
	$scope.restaurant = $scope.restaurants[0];
	$scope.lat = "";
	$scope.long = "";
	$scope.mapOptions = {zoom: 16};
	var ref = firebase.database().ref('restaurants/');
	$scope.fbRestsArr = $firebaseArray(ref);
	ref.orderByChild("name").equalTo("Burretos")
			.on("value",function(data){
						console.log(data.val());
	})
	$scope.newRests = {};
	$scope.newDeal = {};
	$scope.fbRestsObj = $firebaseObject(ref);
	$scope.currentDeals = [];
//FETCH RESTAURANT DATA FROM FIREBASE//////////////////////////////////////////////////////////
	$scope.rests = [];
	$scope.fbRestsObj.$loaded().then(function(data) {
			angular.forEach(data, function(value) {

						$scope.rests.push(value);
						console.log($scope.rests);

			});

			$scope.currentDeals= $scope.rests[0].deals;
				console.log($scope.currentDeals.length);
				//need some logic here to reference the relevant restaurant

	});

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
										$scope.newRests.id = "2";

										$scope.fbRestsArr.$add({id:$scope.newRests.id,
														name:$scope.newRests.name,
														address:$scope.newRests.address,
														type:$scope.newRests.type,
														email:$scope.newRests.email,
														phone:$scope.newRests.phone,
														coords:$scope.newRests.coords,
														deals:[{details:"", conditions:"", start:"", end:""}],
														images:[],
														currentDeal : true
													});
				});

		$location.path('/page102');
	};
//////////////////////////////DUEL CONTROLLER TO BIND TO THE RESTERAUNT ACCOUNT VIEW TEMPLATE//////////////////////////////

	main.addDeal = function(){
		$scope.fbRestsObj = $firebaseObject(ref);
		$scope.fbRestsObj.$loaded().then(function(data) {
				angular.forEach(data, function(value) {
					if(value.id == "2"){
						console.log(value.deals);
							value.deals.push(
								{
								name:"newDeal.name",
								dealReference:"newDeal.ref",
								details:"newDeal.details",
								conditions:"newDeal.conditions",
								start:"newDeal.start",
								end:"newDeal.end"
							}
							);
							$scope.fbRestsObj.$save(ref).then(function(){

							console.log("new deal added");
							})
					}
				});
			});



	}


	//use this for update deals

	/*$scope.fbRestsObj.$loaded().then(function(data) {

		angular.forEach(data, function(value) {
			if(value.id == "2"){
				value.deals.dealDetails = "nice deal";
				value.deals.uptake = "2";
				console.log(value);
				console.log(data);
				$scope.fbRestsObj.$save(ref).then(function(){

					console.log("jwedjkfre");
				})
				return;
			}


	 });


 });*/

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

.controller('todaysDealsCtrl', ['$scope', '$stateParams', 'firebase', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, firebase, $firebaseObject) {
		var ref = firebase.database().ref('restaurants/');
		$scope.deal = {name:"namek"};
		$scope.fbRestsObj = $firebaseObject(ref);
		$scope.todaysDeals = {};
		$scope.fbRestsObj.$loaded().then(function(data) {
				angular.forEach(data, function(value) {
console.log(value.name);
					console.log(value);
					 for(var i = 0; i < value.deals.length; i++){
							 //if((value.deals[i].start <= today) && (value.deals[i].end >= today)){


							//};
						 		console.log(value.deals[i].details);
					 }//for
				});//foreach


		});//loaded

}]);
