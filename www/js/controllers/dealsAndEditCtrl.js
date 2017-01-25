angular.module('dealsAndEditController', ['firebase'])//may not need to inject firebase here

.controller('dealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	console.log("dealsCtrl controller");
	
	$scope.$on("$ionicView.beforeEnter", function(){
	   
	   $scope.historicalDeal = dealsAndEditFactory.getHistoricalDeals();//console.log($scope.historicalDeal);
		console.log($scope.historicalDeal);
	});
	//initalise variables
	
	$scope.deals = dealsAndEditFactory.getDeals();//console.log($scope.deals);
	
	
	$scope.loggedInRestaurant = dealsAndEditFactory.getLoggedInRestaurant();//console.log($scope.loggedInRestaurant);
	$scope.currentDeal = dealsAndEditFactory.getCurrentDeal();//console.log($scope.currentDeal);
	
	
	//PROBLEM WITH DATA NOT UPDATING ON THE VIEW REF: templates/history.html
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

/*.controller('newDealsCtrl', ['$scope', '$stateParams', 'RestaurantFactory', 
function ($scope, $stateParams, RestaurantFactory) {
	
	"use strict";

	$scope.addNewDeal = function(newDeal){
		console.log(newDeal);
		RestaurantFactory.setAddNewDeal(newDeal);
	}
	
	
		
		
}])*/;