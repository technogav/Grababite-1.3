angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

}])

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$http', '$location', '$ionicSideMenuDelegate',
function ($scope, $stateParams, RestaurantFactory, $http, $location, $ionicSideMenuDelegate) {
	//console.log("restaurantAccountCtrl");
	
	//
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

.controller('customerSignUpCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location', '$ionicPopup',
function ($scope, $stateParams, RestaurantFactory, $location, $ionicPopup) {
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
			var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Your login details are incorrect.'
					});
				alertPopup.then(function(res) {

				});
				showAlert();
			};
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
			var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Your login details are incorrect.'
					});
				alertPopup.then(function(res) {

				});
				showAlert();
			};
			
		}
		
	};
	
	//have the custOrRest page here too
		
		
}])

.controller('reserveTableCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location', 'ionicTimePicker', 'ionicDatePicker',
function ($scope, $stateParams, RestaurantFactory, $location, ionicTimePicker, ionicDatePicker) {
	"use strict";
	console.log("reserveTable");
	$scope.resTime = "Enter Time";
	$scope.resDate = "Enter Date";
	var details = RestaurantFactory.getReserveDeal();
	//console.log(details);
	var customerDetails = RestaurantFactory.getCurrentUser();
	var setStartTime = {
		callback: function (val) {      //Mandatory
			if (typeof (val) === 'undefined') {
				console.log('Time not selected');
			} else {
				var selectedTime = new Date(val * 1000).toTimeString();
				$scope.resTime =selectedTime.substr(0,5);


			}
		},
		inputTime: 50400,   //Optional
		format: 12,         //Optional
		step: 15,           //Optional
		setLabel: 'Set'    //Optional
	};
	var setStartDate = {
      callback: function (val) {  //Mandatory
		  if (typeof (val) === 'undefined') {
			  //console.log('Date not selected');
		  } else {
			  var selectedDate = new Date(val).toDateString();
			  $scope.resDate =selectedDate;
		  }
      },
      /*disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],*/
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2021, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
	$scope.getStartDate = function(){
      ionicDatePicker.openDatePicker(setStartDate);
    };
	//function to open time picker
	$scope.getReservationTime = function(){
		ionicTimePicker.openTimePicker(setStartTime);
	}
	//function to open date picker
	$scope.getReservationDate = function(){
		ionicDatePicker.openDatePicker(setStartDate);
	}
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
		var xdate = $scope.resDate;
		var xtime = $scope.resTime;
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
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant, $scope.reserveDeal);
			}else{
				
				$scope.restaurant.bookings.push(reseravtionObj);
				RestaurantFactory.addNewRestaurantBooking($scope.restaurant, $scope.reserveDeal);
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
		
	}
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


