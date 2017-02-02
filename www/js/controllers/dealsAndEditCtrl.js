angular.module('dealsAndEditController', ['firebase'])//may not need to inject firebase here

.controller('dealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	//console.log("dealsCtrl controller");
	$scope.$on("$ionicView.beforeEnter", function(){
	   
		$scope.historicalDeal = dealsAndEditFactory.getHistoricalDeals();//console.log($scope.historicalDeal);
		$scope.deals = dealsAndEditFactory.getDeals();//console.log($scope.deals);
		$scope.loggedInRestaurant = dealsAndEditFactory.getLoggedInRestaurant();//console.log($scope.loggedInRestaurant);
		$scope.currentDeal = dealsAndEditFactory.getCurrentDeal();//console.log($scope.currentDeal);
	});
	
	$scope.$on("$ionicView.beforeLeave", function(){
		$scope.currentDeal = [];
	});
	
	//initalise variables
	$scope.signUpCustomer = dealsAndEditFactory.getSignUpCustomer();//get rid of this an after customer sign up redirect back to login
	
	$scope.pastDealEdit = function(deal){
		//set the deal to the service 
		dealsAndEditFactory.setDealToEdit(deal);
		$location.path('/page103');
	};
		
		
	
}])

.controller('editDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	console.log("editDealCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.dealToEdit = dealsAndEditFactory.getDealToEdit();

	});

	//FUNCTION: reactivate current deal by updateing the start date/ end date and resetting uptake to zero
	$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
	
	//console.log($scope.liveDeals);
	
	$scope.reactivateDeal = function(deal){
		dealsAndEditFactory.setReactivateDeal(deal);
 	};
	
	$scope.removeDeal = function(deal){
		dealsAndEditFactory.setRemoveDeal(deal);
	};
	
	
	$scope.pastDealsEdit = function(deal){
		//set the deal to the service 
		dealsAndEditFactory.setDealToEdit(deal);
		$location.path('/editLiveDeal');
	}
	
	$scope.saveEdit = function(deal){
		
		dealsAndEditFactory.setSaveDeal(deal);
	};

}])

.controller('newDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', 
function ($scope, $stateParams, dealsAndEditFactory) {
	
	"use strict";

	$scope.addNewDeal = function(newDeal){
		console.log(newDeal);
		dealsAndEditFactory.setAddNewDeal(newDeal);
	}
	
	
		
		
}]);