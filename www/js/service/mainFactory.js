angular.module('mainFactory', ['firebase'])

.factory('mainFactory', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){

	var mainFactory = this;
	var ref = firebase.database().ref('restaurants/');
	var custRef = firebase.database().ref('customers/');
	var fbArray = $firebaseArray(ref);
	var fbCustomerArray = $firebaseArray(custRef);
	var rests = [];
	var deals = [];
	var currentDeal = [];
	var historicalDeals = [];
	var restaurantIndex = 0;
	var loggedInName = "Gavins Grub"; // login controller will link heer
	var loggedInRestaurant = [];
	var liveDeals = [];
	var today = new Date();
	//set vars
	fbArray.$loaded().then(function(data) {
		angular.forEach(data, function(value,key) {
			rests.push(value);//**SET**//
			
			if(value.name === loggedInName){
				restaurantIndex = key; //**SET**//
				console.log(restaurantIndex);
				loggedInRestaurant = value; //**SET**//
				deals = value.deals; //**SET**//
						
				angular.forEach(deals, function(value) {
					var end = new Date(value.endDate);
					var start = new Date(value.startDate);
					
					if((today <= end) && (value.uptake < value.numberAvailable)) {	
						currentDeal.push(value);		
						if(currentDeal.length > 1){
							alert("You currently have two deals or more active for today!");
						}else{
							fbArray[restaurantIndex].current_deal = currentDeal[0];
							fbArray.$save(restaurantIndex).then(function(){
							});
						}	
					}
					//if todays date is bigger then the end date or uptake is greater than available	
					if((today >= end) || (value.uptake >= value.numberAvailable)){	
						historicalDeals.push(value);//**SET**//			
					};
					
					if(end >today){
						liveDeals.push(value); //**SET**//
					};
					
				});					
			};//if logged in 	
		});		
	});
	mainFactory.getRestaurantIndex = function(){
		console.log(restaurantIndex);
		return restaurantIndex;
	}
	
	mainFactory.getToday = function(){
		return today;
	}
	
	mainFactory.getLiveDeals = function(){
		return liveDeals;
	}
	
	mainFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	};
	
	mainFactory.getNewDeal = function(){
		return newDeal;
	}
	
	mainFactory.getRestaurantIndex = function(){
		return restaurantIndex;
	}
	
	mainFactory.getHistoricalDeals = function(){
		return historicalDeals;
	}
	
	mainFactory.getCurrentDeal = function(){
		return currentDeal;
	}
	
	mainFactory.getRests = function(){
		return rests;
	}
	
	mainFactory.getDeals = function(){
		return deals;
	}
	
	mainFactory.getLoggedInName = function(){
		return loggedInName;
	};
	
	mainFactory.getLoggedInCredentials = function(){
		return loggedInName;
	}
	
	mainFactory.getFbCustomersArr = function(){
		return fbCustomerArray;
	}
	
	mainFactory.getFbRestaurantArr = function(){
		return fbArray;
	}
	return mainFactory;

}])

.service('BlankService', [function(){

}]);
