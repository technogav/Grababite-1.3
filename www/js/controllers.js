angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

}])

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$http', '$location', '$ionicSideMenuDelegate',
function ($scope, $stateParams, RestaurantFactory, $http, $location, $ionicSideMenuDelegate) {
	console.log("restaurantAccountCtrl");
	$scope.$on("$ionicView.beforeEnter", function(){
		
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
		}
	});
	$scope.newRest = [];
	
	//$scope.currentUser = RestaurantFactory.getSignUpCustomer();
	$scope.currentUser = RestaurantFactory.getCurrentUser();
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
		//RestaurantFactory.refreshLoggedInrestaurant();
	};

}])

.controller('customerAccountCtrl', ['$scope', '$stateParams', 'customerFactory', '$http', '$location',
function ($scope, $stateParams, customerFactory, $http, $location) {
	$scope.currentUser = customerFactory.getCurrentUser();
	
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
		
			$location.path('/login');
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
		
			$location.path('/login');
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
	
	
	$scope.reserveDeal = details[0];//console.log($scope.reserveDeal);
	//console.log($scope.reserveDeal);
	$scope.restaurant = details[1];//console.log($scope.restaurant);
	//console.log($scope.restaurant);
	$scope.UID = details[2];
	$scope.reservationTime = [];
	$scope.reservationDate = [];
	$scope.displayStartDate = new Date($scope.reserveDeal.startDate);
	$scope.displayEndDate = new Date($scope.reserveDeal.endDate);
	$scope.displayStartTime = $scope.reserveDeal.startTime.substr(0,5);
	$scope.displayEndTime = $scope.reserveDeal.endTime.substr(0,5);
	$scope.newCustomerReseravtion = [];
	
	
	$scope.makeReservation = function(reserve){//no ng click yet
		console.log(reserve);
		var xdate = reserve.date.toDateString();
		var xtime = reserve.time.toTimeString();
		xtime = xtime.substr(0,5);
		var reseravtionObj = {
								customer_name : customerDetails.account_name,
								customer_email : customerDetails.email,
								customer_phone : customerDetails.phone,
								restaurant_name : $scope.restaurant.name,
								restaurant_address : $scope.restaurant.address,
								restaurant_coords : $scope.restaurant.coords,
								restaurant_phone : $scope.restaurant.phone,
								restaurant_email : $scope.restaurant.email,
								deal_name : $scope.reserveDeal.deal_name,
								deal_details : $scope.reserveDeal.details,
								deal_conditions: $scope.reserveDeal.conditions,
								deal_start_date: $scope.reserveDeal.startDate,
								deal_end_date: $scope.reserveDeal.endDate,
								deal_start_time: $scope.reserveDeal.startTime,
								deal_end_time: $scope.reserveDeal.endTime,
								reservation_date : xdate,
								reservation_time : xtime
								};
		

		var newRestaurantBooking = function(){
			if($scope.restaurant.bookings === undefined){
				$scope.restaurant.bookings = [];
				$scope.restaurant.bookings.push(reseravtionObj);
				//console.log($scope.restaurant);
				//send to the factory along with the UID number to fbArray.$save
				console.log($scope.restaurant);
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant);
			}else{
				
				$scope.restaurant.bookings.push(reseravtionObj);
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant);
			};
		};
		newRestaurantBooking();
		
		
		var newCustomerBooking = function(){
			console.log(customerDetails);
			if(customerDetails.bookings == undefined){
				
				//create restaurant object with the new booking
				customerDetails.bookings = [];
				customerDetails.bookings.push(reseravtionObj);
				//console.log($scope.restaurant.bookings);
				console.log(customerDetails);
				//send to the factory along with the UID number to fbArray.$save
				RestaurantFactory.addNewCustomerBooking(customerDetails)
			}else{
				
				customerDetails.bookings.push(reseravtionObj);
				RestaurantFactory.addNewCustomerBooking(customerDetails)
			}
		};
		newCustomerBooking();
		$location.path('/page1/page3');//maybe do this on a promise
	}//tick
	
	
		
	
	
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
}])

.controller('reservationCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	console.log("reservationCtrl");
	
	$scope.reservations = RestaurantFactory.getReservations();
	
	console.log($scope.reservations);
}])

.controller('customerBookingDetailsCtrl', ['$scope', '$stateParams', 'customerFactory', '$location',
function ($scope, $stateParams, customerFactory, $location) {
	console.log(bookingDetailsCtrl);
	$scope.reservation = customerFactory.getReservation();
}])

.controller('bookingsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	console.log("bookings");
	
	$scope.bookings = RestaurantFactory.getBookings();
	console.log($scope.bookings);
	//pass object to the factory
	$scope.bookingDetails = function(b){
		RestaurantFactory.setBookingDetail(b);
		$location.path('/page201/customerBookingDetails');
	}
	
}])










.controller('myCustomerAccountCtrl', ['$scope', '$stateParams', 'customerFactory',
function ($scope, $stateParams, customerFactory) {
	console.log("myCustomerAccountCtrl");
	$scope.$on("$ionicView.beforeEnter", function(){
		
		$scope.currentUser = customerFactory.getCurrentUser();
		console.log($scope.currentUser);
	});
	$scope.updateAccountInfo = function(account){
		console.log(account);
		customerFactory.setUpdateAccountInfo(account);
	}
	
}])

.controller('customerBookingDetailsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	"use strict";
	console.log("customerBookingDetailsCtrl");
	
	
	$scope.$on("$ionicView.beforeEnter", function(){
		
		$scope.bookingDetail = RestaurantFactory.getBookingDetail();
	});
	
	
}]);


