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

	$scope.newCustomer = function(newCust){
		
		if(newCust.password1 === newCust.password2){
			RestaurantFactory.setCustomer(newCust);//THIS WORKS
		
			$location.path('/page1/page3');
		}else{
			newCust.password1 = "";
			newCust.password2 = "";
			alert("passwords did not match. Please enter again.")
		}
		
	}
		
		
}])

.controller('reserveTableCtrl', ['$scope', '$stateParams', 'RestaurantFactory', '$location',
function ($scope, $stateParams, RestaurantFactory, $location) {
	console.log("reserveTable");
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.reserveDeal = RestaurantFactory.getReserveDeal();

	});
	
	console.log($scope.reserveDeal);
	
	/*$scope.reserveDeal.bookings = [{customer_name:"", 
									phone: "",
								   email: "",
								   time: $scope.time,
								   date: $scope.date,
								   reservationNum: "123"}];
	
	RestaurantFactory.setReservationDeal($scope.reserveDeal);
	*/	
}]);


