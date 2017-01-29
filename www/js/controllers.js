angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

}])

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$http', '$location',
function ($scope, $stateParams, RestaurantFactory, $http, $location) {
	console.log("restaurantAccountCtrl");
	$scope.newRest = [];
	
	$scope.currentUser = RestaurantFactory.getSignUpCustomer();
		//console.log($scope.currentUser);
	
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
				$scope.newRest.account_name = $scope.currentUser.account_name;
				$scope.newRest.coords = [searched_lat, searched_long];
				$scope.newRest.id = $scope.newRest.account_name + searched_lat;
				//$scope.newRest.deals = [{deal_name:"a"}];
				
				$scope.sendToService($scope.newRest);
			});
	};
	
	$scope.sendToService = function(newRest){
		
		RestaurantFactory.setRestaurant(newRest);//THIS WORKS
		alert("restaurant added"); //however it is brittle because there is no way to check if restaurant is actually added
		$location.path('/page201/page100');
	};

}])

.controller('customerSignUpCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	var main = this;
	console.log("customerSignUpCtrl");
		
	main.newCust = [];
	var account_type = "";
	
	$scope.customer = function(){
		account_type = "customer";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/customerSignUp');//nobody is signed in when redirected to map after sign up
	};
	$scope.restaurant = function(){
		account_type = "restaurant";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/customerSignUpRestEd');//page101
	};
	

	$scope.newCustomer = function(newCust){
		
		var account_type = RestaurantFactory.getAccountType();
		
		if(newCust.password1 === newCust.password2){
			newCust.account_type = account_type;
			console.log(account_type);
			console.log(newCust);
			RestaurantFactory.setCustomer(newCust);//THIS WORKS
		
			$location.path('/page1/page3');
		}else{
			newCust.password1 = "";
			newCust.password2 = "";
			alert("passwords did not match. Please enter again.")
		};
		
	};
	
	$scope.newCustomerRest = function(newCust){
		
		var account_type = RestaurantFactory.getAccountType();
		
		if(newCust.password1 === newCust.password2){
			newCust.account_type = account_type;
			//console.log(account_type);
			//console.log(newCust);
			RestaurantFactory.setCustomer(newCust);//THIS WORKS
		
			$location.path('/page101');
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
	//console.log(details);
	var customerDetails = RestaurantFactory.getCurrentUser();
	//console.log(customerDetails);
	$scope.reserveDeal = details[0];//console.log($scope.reserveDeal);
	$scope.restaurant = details[1];//console.log($scope.restaurant);
	$scope.UID = details[2];
	$scope.reservationTime = [];
	$scope.reservationDate = [];
	
	$scope.newCustomerReseravtion = [];
	
	
	$scope.makeReservation = function(reserve){//no ng click yet
		console.log(reserve);
		var xdate = reserve.date.toDateString();
		var xtime = reserve.time.toDateString();
		var reseravtionObj = [{
								name: customerDetails.account_name,
								email: customerDetails.email,
								phone: customerDetails.phone,
								date: xdate,
								time: xtime,
								deal_name : $scope.reserveDeal.deal_name,
								details : $scope.reserveDeal.details,
								conditions: $scope.reserveDeal.conditions,
								start_date: $scope.reserveDeal.startDate,
								end_date: $scope.reserveDeal.endDate,
								start_time: $scope.reserveDeal.startTime,
								end_time: $scope.reserveDeal.endTime
								}];
	
		
		var newRestaurantBooking = function(){
			if($scope.restaurant.bookings == undefined){
				console.log("undefined motha fuca");
				//create restaurant object with the new booking
				$scope.restaurant.bookings = [];
			
				$scope.restaurant.bookings.push(reseravtionObj);
				//console.log($scope.restaurant);
				//send to the factory along with the UID number to fbArray.$save
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant, $scope.UID);
			}else{
				
				$scope.restaurant.bookings.push(reseravtionObj);
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant, $scope.UID);
			};
		};
		newRestaurantBooking();
		
		
		var newCustomerBooking = function(){
			if(customerDetails.bookings == undefined){
				console.log("undefined");
				//create restaurant object with the new booking
				customerDetails.bookings = [];
				customerDetails.bookings.push(reseravtionObj);
				//console.log($scope.restaurant.bookings);
				//send to the factory along with the UID number to fbArray.$save
				RestaurantFactory.addNewCustomerBooking(customerDetails, customerDetails.$id)
			}else{
				
				customerDetails.bookings.push(reseravtionObj);
				RestaurantFactory.addNewCustomerBooking(customerDetails, customerDetails.$id)
			}
		};
		newCustomerBooking();
		
	}
	
	
		
	
	
	//create new customer object with the new booking
		//send to the factory along with the UID number to fbArray.$save
	
	
	
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


