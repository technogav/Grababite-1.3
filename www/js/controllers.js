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
	$scope.fbRestsObj = $firebaseObject(ref);

console.log($scope.fbRestsObj);

	var y = function(name){
		console.log(ref);
		ref.orderByChild("name").equalTo(name)
				.on("value",function(data){
							var x =data.val();
							console.log(x);

		})
	}





	$scope.newRests = {};
	$scope.newDeal = {};

	$scope.deals = [];
	$scope.currentDeals = [];
	$scope.loggedInName = "Gavins Grub";

//FETCH RESTAURANT DATA FROM FIREBASE//////////////////////////////////////////////////////////
	$scope.rests = [];

	$scope.fbRestsObj.$loaded().then(function(data) {
			angular.forEach(data, function(value) {
						console.log(value);
						if(value.name === $scope.loggedInName){
							$scope.deals = value.deals;
							$scope.loggedInRest = value;
							//get all scope vars here for firebase stuff
							angular.forEach($scope.deals, function(value) {
							var x = new Date(value.startDate);
							//console.log(x);
							var today = new Date();
							if((today > x) && (value.uptake < value.numberAvailable)){
									console.log(value);
									$scope.currentDeals[0] = value;

							}else{

							}
						}
						);
							for(var i = 0; i > $scope.deals.length; i++){
									var w = $scope.deals[i];
									console.log(w);
							}
						}else{//handle this later
						}
			});
//console.log($scope.rests);





				/*for(var i =0; i < $scope.currentDeals.length; i++){
						var start = new Date($scope.currentDeals[i].start);
						//console.log("2");
						if((start >= today) && ($scope.currentDeals[i].uptake !=  $scope.currentDeals[i].numAvailable)){
							$scope.todaysDeals = $scope.currentDeals[i].deal;
						}
				}*/



				//var dd = d.getDate();
				//var mm = d.getMonth()+1; //January is 0!
			//	var yyyy = d.getFullYear();
//console.log(d.toDateString());

				//need some logic here to reference the relevant restaurant
				$scope.todaysDeals = "";

	});



//get current coords and bind them to scope/////////////////////////////////////////////////////////////
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
										$scope.accountName = "Gavin";
										$scope.newRests.coords = [searched_lat, searched_long];
										$scope.fbRestsArr.$add({
														name:$scope.newRests.name,
														account_name: $scope.accountName,
														address:$scope.newRests.address,
														type:$scope.newRests.type,
														email:$scope.newRests.email,
														phone:$scope.newRests.phone,
														coords:$scope.newRests.coords,
														deals:[{deal_name:"a"}, {deal_name:"b"}],
														images:[]
													}).then(function(){
															alert("restaurant added");
															$location.path('/page201/page102');

													});


				});


	};

main.skip = function(){
		$location.path('/page201/page102');
}
main.skip2 = function(){
		$location.path('/page201/page100');
}

	main.addDeal = function(){
		//console.log($scope.fbRestsObj);
				$scope.fbRestsObj.$loaded().then(function(data) {
						angular.forEach(data, function(value) {
							console.log(value);
							if(value.name == $scope.loggedInName){
								var d = new Date();
								//this will break easily when a deal is deleted
								//maybe loop tru value.deals to find the highest id then add one
								var id = value.deals.length;
								var id = id + 1;
								$scope.newDeal.startDate = $scope.newDeal.startDate.toDateString();
								$scope.newDeal.startTime = $scope.newDeal.startTime.toTimeString();
								$scope.newDeal.endTime = $scope.newDeal.endTime.toTimeString();

									value.deals.push(
										{
											id: id,
											conditions: $scope.newDeal.conditions,
											deal_name: $scope.newDeal.name,
											details:$scope.newDeal.description,
											numberAvailable:$scope.newDeal.numOfDeals,
											startDate:$scope.newDeal.startDate,
											startTime:$scope.newDeal.startTime,
											endTime:$scope.newDeal.endTime,
											uptake:"0"
									});

									$scope.fbRestsObj.$save(ref).then(function(){
									console.log("new deal added");
									$location.path('/page201/page100');
								});
							}
						});
					});
			}










		/*$scope.fbRestsObj.$loaded().then(function(data) {
				angular.forEach(data, function(value) {
					//think of way to target prooper
					console.log(value);

					if(value.name == "Gavins Grub"){


							angular.forEach(value.deals, function(value) {
								console.log(value);
								angular.forEach(value,function(value){
										angular.forEach(value,function(value){
											console.log(value);
										})
								})
							});
							$scope.fbRestsObj.$save(ref).then(function(){

						//	console.log("new deal added");
							})
					}else{
						//console.log("not logged in");
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
 $scope.editDeal = [];
 $scope.pastDealEdit = function(x){
	 	$scope.editDeal = x;
	 	$location.path('/page201/page103');

 }
 $scope.reactivateDeal = function(deal){

	 //use firebaseOBJ to target the restaurant
	 //use restaurant to target deals by some UID maybe name
	 //get snaphot of deal then update with infor below
		 var today = new Date();
		 deal.startDate = today;
		 deal.uptake = 0;
		 var reactivatedDeal = deal;
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


}]);
