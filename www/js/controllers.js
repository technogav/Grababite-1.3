angular.module('app.controllers', ['firebase'])//may not need to inject firebase here

.controller('menuCtrl', ['$scope', '$stateParams','$location','$rootScope',
function ($scope, $stateParams,$location, $rootScope) {
	//use this controller to dynamically change the side menubar
	$scope.menuItems = [];
	$rootScope.$on('$stateChangeSuccess', function(){
		var absUrl = $location.absUrl();
		absUrl = absUrl.substr(absUrl.lastIndexOf("/") + 1);
		/*assign a sidemenu thats relevent to the page*/
		//rearrange this for optimization later
		if((absUrl === "page3") || (absUrl === "page2") || (absUrl === "page1") || (absUrl === "page4")|| (absUrl === "reserveTable")){
			$scope.menuItems = [
						{item: "Home", icon:"<i class='icon ion-home'></i>", link:"#/login"},
						{item: "Logout" , icon:"<i class='icon ion-log-out'>", link:"#/page100"}
			];
		}
		else if((absUrl === "history") || (absUrl === "bookings") || (absUrl === "page102") || (absUrl === "page100") || (absUrl === "myDeals")|| (absUrl === "page101")|| (absUrl === "restaurantMapView")){
			$scope.menuItems = [
						{item: "Home", icon:"<i class='icon ion-home'></i>", link:"#/page201/page100"},
						{item: "Add Restaurant" , icon:"<i class='icon ion-plus-circled'>", link:"#/page101"},//this will be edit profile
						{item: "Map" , icon:"<i class='icon ion-map'>", link:"#/page201/restaurantMapView"},
						{item: "History" , icon:"<i class='icon ion-eye'>", link:"#/history"},
						{item: "Logout" , icon:"<i class='icon ion-log-out'>", link:"#/login"}//this needs a function to clear data
			];	
		}
		else{
			$scope.menuItems = [];
		}
	});		
}])//ok

.controller('restaurantAccountCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$http', '$location', '$ionicSideMenuDelegate',
function ($scope, $stateParams, RestaurantFactory, $http, $location, $ionicSideMenuDelegate) {
	var main = this;
	$scope.$on("$ionicView.beforeEnter", function(){
		
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
		}
	});
	
	
	
	//$scope.newRest = [];
	
	
	/*make restaurant object and send to another function to send to factory*/
	$scope.addRestaurant = function(x){
		console.log(x);
		//RestaurantFactory.setCurrentUser(x.name);
		$scope.currentUser = RestaurantFactory.getCurrentUser();console.log($scope.currentUser);
		var url = "http://maps.google.com/maps/api/geocode/json?address=" + x.address;
			$http({
				method: 'GET',
				url: url
			}).then(function successCallback(response) {

				var releventMapData = response.data.results[0];
				var searchedreleventMapData_lat = releventMapData.geometry.location.lat;
				var searched_lat = releventMapData.geometry.location.lat;
				var searched_long = releventMapData.geometry.location.lng;
				x.account_name = $scope.currentUser.account_name;
				console.log(x);
				
				x.coords = [searched_lat, searched_long];
				x.id = x.account_name + searched_lat;
				//$scope.newRest.deals = [{deal_name:"a"}];
				console.log(x);
				$scope.sendToService(x);
				
				
			});
	};
	
	/*send restaurant object to the factory to be saved to firebase and usful vars collected*/
	$scope.sendToService = function(newRest){
		RestaurantFactory.setRestaurant(newRest);		
	};

}])//ok

.controller('customerAccountCtrl', ['$scope', '$stateParams', 'customerFactory', '$http', '$location',
function ($scope, $stateParams, customerFactory, $http, $location) {
	$scope.currentUser = customerFactory.getCurrentUser();
	
}])//ok

.controller('customerSignUpCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location', '$ionicPopup',
function ($scope, $stateParams, RestaurantFactory, $location, $ionicPopup) {
	var main = this;
	//console.log("customerSignUpCtrl");	
	main.newCust = [];
	var account_type = "";
	
	/*decide weather the customer will sign up as a restaurant of consumer*/	
	//sets the account type to customer at the factory level & directs to the relevent sign up view
	$scope.customer = function(){
		account_type = "customer";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/customerSignUp');
	};
	
	//sets the account type to customer at the factory level & directs to the relevent sign up view
	$scope.restaurant = function(){
		account_type = "restaurant";
		RestaurantFactory.setAccountType(account_type);
		$location.path('/customerSignUpRestEd');//page101
	};
	
	//Add a new customer of the customer type
	$scope.newCustomer = function(newCust){
	
		
		var account_type = RestaurantFactory.getAccountType();
		
		if(newCust.password1 === newCust.password2){
			
			/*bind the account type to the scope object newCust $scope.newCust*/
			newCust.account_type = account_type;
			
			//send newCust to th efactory to be saved to FB 
			RestaurantFactory.setCustomer(newCust);
		
			$location.path('/login');
			var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Sign In',
						template: 'Please login with your new id. <br><br>(note: this login is brittle and if you use a name thats already been used it will mess up the app. i plan on using OAuth for the login).'
					});
					alertPopup.then(function(res) {

					});

				};
				showAlert()
			
		}else{
			//handle login errors
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
	
	//add a new customer of the restaurant type
	$scope.newCustomerRest = function(newCust){
		/*newCust is the object passed back from the view with all the  fields filled in*/
		console.log(newCust);
		var account_type = RestaurantFactory.getAccountType();//possibly redundant code as account has been set in this controller
		
		/*if passwords match send newCust obj to the factory to get saved to FB and to set the customers signUpCustomer var*/
		if(newCust.password1 === newCust.password2){
			RestaurantFactory.setCurrentUser(newCust.name);
			newCust.account_type = account_type;
			//console.log(newCust.account_name);
			RestaurantFactory.setCustomer(newCust);
			var cu;
			if(RestaurantFactory.setCurrentUser(newCust)){
				
				cu = RestaurantFactory.getCurrentUser();
				console.log(cu);
			}//to factory level
			
			
			
			if(newCust.account_type === "restaurant"){
				$location.path('/page101');
				var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Sign In',
						template: 'Please add a restaurant to get started.'
					});
					alertPopup.then(function(res) {

					});

				};
				showAlert();
				
				//RestaurantFactory.initVariables(newCust.account_name)//to factory level
			}else{
				$location.path('/login');
				var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Sign In',
						template: 'Please login with your new id. <br><br>(note: this login is brittle and if you use a name thats already been used it will mess up the app. i plan on using OAuth for the login).'
					});
					alertPopup.then(function(res) {

					});

				};
				showAlert()
			}
			
		}else{
			newCust.password1 = "";
			newCust.password2 = "";
			/*handle login errors*///needs alot more
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
	
	//two simular functions here all the only difference is where they relocate to surly there is a neater way to do this
		
		
}])//needs to be rewritten

.controller('reserveTableCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location', 'ionicTimePicker', 'ionicDatePicker',
function ($scope, $stateParams, RestaurantFactory, $location, ionicTimePicker, ionicDatePicker) {
	"use strict";
	//console.log("reserveTable");
	$scope.resTime = "Enter Time";
	$scope.resDate = "Enter Date";
	/*get the details of the reserveDeal obj*/
	var details = RestaurantFactory.getReserveDeal();
	console.log(details);
	//get customer details
	var customerDetails = RestaurantFactory.getCurrentUser();
	console.log(customerDetails);
	/*predefined timepicker functions unusual syntax- rewrite to include an arg*/
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
	
	
	$scope.makeReservation = function(){//no ng click yet
		//RestaurantFactory.incrementCurrent_dealInFB();use this if i cannot find an alt
		//put an if to ask weather all the fields have benn successfully filled
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

.controller('reservationCtrl', ['$scope', '$stateParams', 'RestaurantFactory',
function ($scope, $stateParams, RestaurantFactory) {
	"use strict";
	//console.log("reservationCtrl");
	
	$scope.reservations = RestaurantFactory.getReservations();
	$scope.reservations.reservation_date = new Date($scope.reservations.reservation_date);
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
	//console.log($scope.bookings);
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


