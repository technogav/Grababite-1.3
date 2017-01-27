angular.module('mainFactory', ['firebase'])

.factory('mainFactory', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){

	var mainFactory = this;
	var ref = firebase.database().ref('restaurants/');
	var custRef = firebase.database().ref('customers/');
	var fbArray = $firebaseArray(ref);
	var fbCustomerArray = $firebaseArray(custRef);
	var rests = [];
	var deals = [];
	var custs = [];
	var currentDeal = [];
	var historicalDeals = [];
	var restaurantIndex = 0;
	
	//LoginCtrl => accountFactory{if customer.account_name == restaurant.accountName then loggedinname = restaurant.acountName}
	
	var loggedInRestaurant = [];
	var liveDeals = [];
	var today = new Date();
	var loggedInName = "";
	var currentUser = [];
	fbArray.$loaded().then(function(data) {
		angular.forEach(data, function(value,key) {
					rests.push(value);//**SET**//
		});
	});
	//put this into a function that is called when login is clicked : only init vars when login is clicked
	//set vars
	mainFactory.initVars = function(account_name){
		loggedInName = account_name;
		//console.log(account_name);
			fbArray.$loaded().then(function(data) {
			angular.forEach(data, function(value,key) {
				//rests.push(value);//**SET**//

				if(value.name === account_name){
					restaurantIndex = key; //**SET**//
					//console.log(restaurantIndex);
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
	};
	
	fbCustomerArray.$loaded().then(function(data){
		angular.forEach(data, function(value,key) {
			
			custs.push(value);
			//console.log(custs);
		});
	});
	
	mainFactory.setLoggedInName = function(account_name){
		loggedInName = account_name;
	}
	
	mainFactory.setCurrentUser = function(user){
		currentUser = user;
	}
	
	mainFactory.getRestaurantIndex = function(){
		console.log(restaurantIndex);
		return restaurantIndex;
	}
	
	mainFactory.getCurrentUser = function(){
		return currentUser;
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
	
	mainFactory.getCusts = function(){
		
		return custs;
	}
	
	return mainFactory;

}])

.service('BlankService', [function(){

}]);
