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
		console.log("loadede");
		angular.forEach(data, function(value,key) {
					rests.push(value);//**SET**//
		});
	});
	//put this into a function that is called when login is clicked : only init vars when login is clicked
	//set vars
	mainFactory.initVars = function(account_name){
		//INIT VARS BASED ON THE USERNAEM INPUT ON THE LOGIN VIEW

			fbArray.$loaded().then(function(data) {
			angular.forEach(data, function(value,key) {
				//rests.push(value);//**SET**//
				//IF BASED ON THE ACCOUNT NAME; BRITTLE CODE IF SOMEONE HAS THE SAME NAME
				if(value.account_name === account_name){
					restaurantIndex = key; //**SET**//
					//console.log(value.deals);
					loggedInRestaurant = value; //**SET**//
					deals = value.deals; //**SET**//

					angular.forEach(deals, function(value) {
						var end = new Date(value.endDate);
						var start = new Date(value.startDate);
console.log(start);
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
	
	mainFactory.getReservations = function(){//stick this function one factory down// actually get mainFactory.getCurrentUser will work
		var reservations = [];
		console.log(currentUser);
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
			today = today.toDateString();
			//console.log(today);
			for(var i =0; i<loggedInRestaurant.bookings.length; i++){
				//console.log(loggedInRestaurant.bookings[i].date);
				if(loggedInRestaurant.bookings[i].date == today){
					console.log("today");
					bookings.push(loggedInRestaurant.bookings[i]);
					console.log(bookings);
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
		//console.log(rests);
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
