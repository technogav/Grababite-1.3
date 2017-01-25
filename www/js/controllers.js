angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

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

.controller('customerSignUpCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	
	console.log("customerSignUpCtrl");
		
	$scope.newCust = [];
	var account_type = "";
	
	$scope.customer = function(){
		account_type = "customer";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/customerSignUp');//nobody is signed in when redirected to map after sign up
	};
	$scope.restaurant = function(){
		account_type = "restaurant";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/page101');
	};
	

	$scope.newCustomer = function(newCust){
		
		var account_type = RestaurantFactory.getAccountType();
		newCust.account_type = account_type;
		if(newCust.password1 === newCust.password2){
			RestaurantFactory.setCustomer(newCust);//THIS WORKS
		
			$location.path('/page1/page3');
		}else{
			newCust.password1 = "";
			newCust.password2 = "";
			alert("passwords did not match. Please enter again.")
		}
		
	};
	
	//have the custOrRest page here too
		
		
}])

.controller('reserveTableCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	console.log("reserveTable");
	
	var details = RestaurantFactory.getReserveDeal();
	console.log(details);
	$scope.reserveDeal = details[0];//console.log($scope.reserveDeal);
	$scope.restaurant = details[1];console.log($scope.restaurant);
	$scope.UID = details[1];
	
	
	
	
	
	
	/*$scope.$on("$ionicView.beforeEnter", function(){
	   
	   
	});*/
	
	
	
	/*$scope.reserveDeal.bookings = [{customer_name:"", 
									phone: "",
								   email: "",
								   time: $scope.time,
								   date: $scope.date,
								   reservationNum: "123"}];
	
	RestaurantFactory.setReservationDeal($scope.reserveDeal);
	*/	
}]);


