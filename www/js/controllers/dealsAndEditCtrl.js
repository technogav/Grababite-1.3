angular.module('dealsAndEditController', ['ionic-timepicker','firebase'])//may not need to inject firebase here


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
		//dealsAndEditFactory.setLiveDeals();
		$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
		
		//temporary fix to show there are no deals available
		if($scope.liveDeals.length == 0){
			console.log("no deal");
			$scope.liveDeals = [{deal_name:"You currently have no live deals."}];
		}
	});
	
	
	$scope.pastDealsEdit = function(deal){
		dealsAndEditFactory.setDealToEdit(deal);
		$location.path('/editLiveDeal');
	}
	
}])

.controller('todayDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', 
function ($scope, $stateParams, dealsAndEditFactory) {
	"use strict";
	
	
	$scope.$on("$ionicView.beforeEnter", function(){
		
		$scope.currentDeal = dealsAndEditFactory.getCurrentDeal();
		//temporary fix to show there are no deals available
		if($scope.currentDeal == null){
			console.log("no deal");
			$scope.currentDeal = {deal_name:"You currently have no deal available for today."};
		}
	});
	
	dealsAndEditFactory.checkForFirstTimeUser();
	
}])

.controller('editDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location', 'ionicTimePicker',
function ($scope, $stateParams, dealsAndEditFactory, $location, ionicTimePicker) {
	"use strict";
	console.log("editDealCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
		//dealsAndEditFactory.setHistoricalDeals();
		$scope.dealToEdit = dealsAndEditFactory.getDealToEdit();
		//$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
		$scope.displayStartTime = $scope.dealToEdit;
	console.log($scope.dealToEdit[0]);
	$scope.displayEndTime = $scope.dealToEdit;
		
	});
	

	//save edit to the database an update current Deal
	$scope.saveEdit = function(deal){
		
		dealsAndEditFactory.setSaveDeal(deal);
		//dealsAndEditFactory.setCurrentDeal();
	};
	
	
	//IonicTimePicker
	var setStartTime = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000).toTimeString();
       $scope.startTime =selectedTime;
        
        
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };
	var setEndTime = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000).toTimeString();
		  
		  $scope.endTime = selectedTime;
        
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


	$scope.getStartTime = function(){
		ionicTimePicker.openTimePicker(setStartTime);
	}
	$scope.getEndTime = function(){
		ionicTimePicker.openTimePicker(setEndTime);
	}
  

}])

.controller('pastDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location','$ionicSideMenuDelegate',
function ($scope, $stateParams, dealsAndEditFactory, $location, $ionicSideMenuDelegate) {
	"use strict";
	console.log("pastDealsCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.historicalDeals = dealsAndEditFactory.getHistoricalDeals();
		//$scope.liveDeals = dealsAndEditFactory.getLiveDeals();
		if($ionicSideMenuDelegate.isOpen()){
			$ionicSideMenuDelegate.toggleRight();
		}
		console.log($scope.historicalDeals);
		if($scope.historicalDeals.length == 0){
			console.log("done");
			$scope.historicalDeals = [{deal_name:"You have no deals in your history"}];
		};
	});
	
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
		$scope.dealToEdit.startTime = $scope.dealToEdit.startTime.substr(0,5);
	$scope.dealToEdit.endTime = $scope.dealToEdit.endTime.substr(0,5);
	});
	
	
		
	$scope.reactivateDeal = function(deal){
		dealsAndEditFactory.setReactivateDeal(deal);
 	};
	
	$scope.removeDeal = function(deal){
		dealsAndEditFactory.setRemoveDeal(deal);
	};
	
}])

.controller('newDealsCtrl', ['$scope', '$stateParams', 'dealsAndEditFactory', '$location','ionicTimePicker', 'ionicDatePicker',
function ($scope, $stateParams, dealsAndEditFactory, $location,ionicTimePicker,ionicDatePicker) {
	
	"use strict";
	$scope.startTime = "Start Time";
	$scope.endTime = "End Time";
	$scope.startDate = "Start Date";
	$scope.endDate = "End Date";
	
	$scope.addNewDeal = function(newDeal){
		console.log(newDeal);
		newDeal.startTime = $scope.startTime;
		newDeal.endTime = $scope.endTime;
		newDeal.startDate = $scope.startDate;
		newDeal.endDate = $scope.endDate;
		
		console.log(newDeal);
		dealsAndEditFactory.setAddNewDeal2(newDeal);
		newDeal = null;

	//$location.path('/page201/page100'); 	
		
	}
	
	
	var setStartDate = {
      callback: function (val) {  //Mandatory
		  if (typeof (val) === 'undefined') {
			  //console.log('Date not selected');
		  } else {
			  var selectedDate = new Date(val).toDateString();
			  $scope.startDate =selectedDate;
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
	var setEndDate = {
      callback: function (val) {  //Mandatory
        if (typeof (val) === 'undefined') {
			  //console.log('Date not selected');
		  } else {
			  var selectedDate = new Date(val).toDateString();
			  $scope.endDate =selectedDate;
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
	$scope.getEndDate = function(){
      ionicDatePicker.openDatePicker(setEndDate);
    };

	var setStartTime = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000).toTimeString();
       $scope.startTime =selectedTime.substr(0,5);
        
        
      }
    },
    inputTime: 43210,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set'    //Optional
  };
	var setEndTime = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000).toTimeString();
		  
		  $scope.endTime = selectedTime.substr(0,5);
        
      }
    },
     inputTime: 43210,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set'    //Optional
  };


	$scope.getStartTime = function(){
		ionicTimePicker.openTimePicker(setStartTime);
	}
	$scope.getEndTime = function(){
		ionicTimePicker.openTimePicker(setEndTime);
	}
  
	
		
		
}]);