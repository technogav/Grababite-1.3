angular.module('mainFactory', ['firebase'])

.factory('mainFactory', ['$firebaseArray', '$firebaseObject', '$location', function($firebaseArray, $firebaseObject, $location){

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
	var loggedInRestaurant = [];
	var liveDeals = [];
	var today = new Date();
	var loggedInName = "";
	var currentUser = [];
	//SET ALL RESTAURANTS
	fbArray.$loaded().then(function(data) {
		angular.forEach(data, function(value,key) {
			rests.push(value);//**SET**//
		});
	});
	//SET ALL CUSTOMERS
	fbCustomerArray.$loaded().then(function(data){
		angular.forEach(data, function(value,key) {
			custs.push(value);
		});
	});

	mainFactory.initVars = function(account_name){
		//INIT VARS BASED ON THE USERNAEM INPUT ON THE LOGIN VIEW only when is a restaurant
		fbArray.$loaded().then(function(data) {
			angular.forEach(data, function(value,key) {
				if(value.account_name === account_name){//username needs to be unique or else problems
					restaurantIndex = key; //**SET**//
					loggedInRestaurant = value; //**SET**//
					deals = value.deals; //**SET**//
				}
			});
		});
	};
	
	mainFactory.getCurrentDealFromDB =function(){
		//console.log(deals);//this is only relevant at initVars stage unless on editDeals etc it is changed on the factory level
		//console.log(loggedInRestaurant.current_deal);
		return loggedInRestaurant.current_deal;
	}
	
	mainFactory.setNewCurrentDeal = function(newCurrentdeal){
		console.log(deals); //see if the deals var reflects changes in db
		
		fbArray[restaurantIndex].current_deal = newCurrentdeal;
		fbArray.$save(restaurantIndex).then(function(){
			$location.path('/page201/page100');
		});
	}
		
	mainFactory.setCurrentDeal = function(){
		//maybe have the livedealsctrl fire off this one
		angular.forEach(deals, function(value) {
			
			today = new Date(today);
			var end = new Date(value.endDate);
			var start = new Date(value.startDate);
			
			if((today <= end) && (value.uptake < value.numberAvailable)) {	
				currentDeal.push(value);

				if(currentDeal.length > 1){
					alert("You currently have two deals or more active for today!");
				}else{
					fbArray[restaurantIndex].current_deal = currentDeal[0];
					fbArray.$save(restaurantIndex).then(function(){
						console.log("current deal is saved to DB");
					});
				}
			}
		});
		//console.log(currentDeal);
	};
	
	mainFactory.resetLiveDeals = function(){
		liveDeals = [];
	}
	
	mainFactory.resetCurrentDeal = function(){
		currentDeal = [];
	};
	
	mainFactory.setLiveDeals = function(){
		
		console.log(liveDeals);
		
		for(var i = 0; i<deals.length; i++){
		
			
			var end = new Date(deals[i].endDate);
			var start = new Date(deals[i].startDate);
			
			
			if(end >today){//think about using the start here
				
				liveDeals[i] = deals[i]; //**SET*/
			};
		}
		
		console.log(liveDeals);
	}
	
	mainFactory.setHistoricalDeals = function(){
		angular.forEach(deals, function(value) {
			var end = new Date(value.endDate);
			var start = new Date(value.startDate);
			if((today >= end) || (value.uptake >= value.numberAvailable)){	
				historicalDeals.push(value);//**SET**//			
			};
			
		});	
	};
	
	mainFactory.resetHistoricalDeals = function(){
		historicalDeals = [];
		liveDeals = [];
	};
	//fire off the history ctrl	will work provided the livedealsctrl has been initilized
						
	mainFactory.getReservations = function(){//stick this function one factory down// actually get mainFactory.getCurrentUser will work
		var reservations = [];
		//console.log(currentUser);
		if(currentUser.bookings !== undefined){
			reservations = currentUser.bookings;
			
		}else{
			reservations = {name: "You currently have no reservations"}
		}
		return reservations;
	}
	
	mainFactory.getBookings = function(){
		var bookings = [];
		if(loggedInRestaurant.bookings !== undefined){
			console.log("book");
			today = today.toDateString();
			console.log(loggedInRestaurant.bookings);
			for(var i =0; i<loggedInRestaurant.bookings.length; i++){
				
				if(loggedInRestaurant.bookings[i].reservation_date == today){
					console.log("today");
					bookings.push(loggedInRestaurant.bookings[i]);
					//console.log(bookings);
				}
			}
		}
		
		return bookings;
		
	}
	
	var signUpCustomer = [];
	mainFactory.setSignUpCustomer = function(customer){
		signUpCustomer = customer;
	}
	
	mainFactory.getSignUpCustomer = function(){
		return signUpCustomer;
	}
	mainFactory.setLoggedInName = function(account_name){
		loggedInName = account_name;
	}
	
	mainFactory.setCurrentUser = function(user){
		currentUser = user;
	}
	
	mainFactory.getRestaurantIndex = function(){
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
