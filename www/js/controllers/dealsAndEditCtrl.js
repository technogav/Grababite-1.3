angular.module('dealsAndEditController', ['firebase'])//may not need to inject firebase here


.controller('dealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	
	console.log("dealsCtrl controller");
	$scope.$on("$ionicView.beforeEnter", function(){
		
		dealsAndEditFactory.setCurrentDeal();//is this taxing the bandwidth by updateing the db everytime the view is entered
		dealsAndEditFactory.setHistoricalDeals();
		$scope.historicalDeal = dealsAndEditFactory.getHistoricalDeals();//console.log($scope.historicalDeal);
		$scope.deals = dealsAndEditFactory.getDeals();//console.log($scope.deals);
		$scope.loggedInRestaurant = dealsAndEditFactory.getLoggedInRestaurant();//console.log($scope.loggedInRestaurant);
		$scope.currentDeal = dealsAndEditFactory.getCurrentDeal();//console.log($scope.currentDeal);
		dealsAndEditFactory.resetHistoricalDeals();
		dealsAndEditFactory.resetCurrentDeal();
	});
	
	$scope.$on("$ionicView.beforeLeave", function(){
		//dealsAndEditFactory.resetCurrentDeal();
		
	});
	
	//initalise variables
	$scope.signUpCustomer = dealsAndEditFactory.getSignUpCustomer();//get rid of this an after customer sign up redirect back to login

}])

.controller('myDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	
	console.log("myDealsCtrl controller");
	//refresh deals from the DB (its in initVars)
	$scope.$on("$ionicView.beforeEnter", function(){
		//dealsAndEditFactory.resetLiveDeals();
		dealsAndEditFactory.setLiveDeals();
		$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
		
	});
	
	
	$scope.pastDealsEdit = function(deal){
		dealsAndEditFactory.setDealToEdit(deal);
		$location.path('/editLiveDeal');
	}
	
}])

.controller('todayDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', 
function ($scope, $stateParams, dealsAndEditFactory) {
	"use strict";
	
	console.log("todayDealsCtrl controller");
	$scope.$on("$ionicView.beforeEnter", function(){
		
		$scope.currentDeal = dealsAndEditFactory.getCurrentDealFromDB();
		
	});
	
	
	
}])

.controller('editDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	console.log("editDealCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
		//dealsAndEditFactory.setHistoricalDeals();
		$scope.dealToEdit = dealsAndEditFactory.getDealToEdit();
		//$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
	});
	
	
	$scope.saveEdit = function(deal){
		
		dealsAndEditFactory.setSaveDeal(deal);
		//dealsAndEditFactory.setCurrentDeal();
	};

}])

.controller('pastDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	console.log("pastDealsCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
		dealsAndEditFactory.setHistoricalDeals();
		//$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
	});
	$scope.historicalDeals = dealsAndEditFactory.getHistoricalDeals();
	
	$scope.pastDealEdit = function(deal){
		dealsAndEditFactory.setDealToEdit(deal);
		$location.path('/page103');
	};
	
}])

.controller('pastDealEditCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location',
function ($scope, $stateParams, dealsAndEditFactory, $location) {
	"use strict";
	console.log("pastDealEditCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.dealToEdit = dealsAndEditFactory.getDealToEdit();
	});
	
		
	$scope.reactivateDeal = function(deal){
		dealsAndEditFactory.setReactivateDeal(deal);
 	};
	
	$scope.removeDeal = function(deal){
		dealsAndEditFactory.setRemoveDeal(deal);
	};
	
}])

.controller('newDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', 
function ($scope, $stateParams, dealsAndEditFactory) {
	
	"use strict";

	$scope.addNewDeal = function(newDeal){
		console.log(newDeal);
		dealsAndEditFactory.setAddNewDeal2(newDeal);
	}
	
	
		
		
}]);