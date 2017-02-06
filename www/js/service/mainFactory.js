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
	var restsWithCurrentDeal = [];
	var customerIndex = 0;
	//SET ALL RESTAURANTS
	fbArray.$loaded().then(function(data) {
		
		angular.forEach(data, function(value,key) {
			rests.push(value);
			if(value.current_deal !== undefined){
				//console.log(value.account_name);
				var end = new Date(value.current_deal.endDate);
				var start = new Date(value.current_deal.startDate);
				if(end >= today){
					
					if(start < today){
						restsWithCurrentDeal.push(value);
					}
				}
			}
			
			
		});
		
	});
	
	mainFactory.setUpdateAccountInfo = function(account){
		console.log(customerIndex);
		console.log(account);
		fbCustomerArray[customerIndex] = account;
		fbCustomerArray.$save(customerIndex).then(function(){
			alert("customer Details have been updated");
				$location.path('/page1/page3')
		});
	};
	
	mainFactory.getRestsWithCurrentDeal = function(){
		return restsWithCurrentDeal;
	}
	//SET ALL CUSTOMERS
	fbCustomerArray.$loaded().then(function(data){
		angular.forEach(data, function(value,key) {
			custs.push(value);
			customerIndex = key;
		});
	});
	
	mainFactory.setAddNewDeal2 = function(new_deal){
		console.log(new_deal);
		var newDeal = {
						"deal_name" : new_deal.deal_name,
						"conditions" : new_deal.conditions,
						"details" : new_deal.description,
						"numberAvailable" : new_deal.numberAvailable,
						"startDate" : new_deal.startDate.toDateString(),
						"endDate" : new_deal.endDate.toDateString(),
						"startTime" : new_deal.startTime.toTimeString(),
						"endTime" : new_deal.endTime.toTimeString(),
						"id" : 0,
						"uptake" : 0
			
		}
		console.log(newDeal);

		if(fbArray[restaurantIndex].deals == undefined){
			
			fbArray[restaurantIndex].deals = [];
			fbArray[restaurantIndex].deals.push(newDeal);
			this.setNewCurrentDeal(newDeal);
		
		}else{
			
			fbArray[restaurantIndex].deals.push(newDeal);
			this.setNewCurrentDeal(newDeal);
		}
		
		fbArray.$save(restaurantIndex).then(function(){
			alert("Your deal has been added")
					
				});	
		
	}
	
	mainFactory.setReactivateDeal = function(new_deal){
		console.log(new_deal);
		
		//get todays date and end date (30 days after today)
		var today = new Date();
		var newEndDate = new Date();
		newEndDate.setDate(today.getDate()+30);
		//convert dates to string
		newEndDate = newEndDate.toDateString();
		today = today.toDateString();
		
		new_deal.startDate = today;
		new_deal.endDate = newEndDate;
		new_deal.uptake = 0;
		
		fbArray.$save(restaurantIndex).then(function(){
					$location.path('/page201/page100'); 
				});	
	}

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
		var current_deal = loggedInRestaurant.current_deal;
		
		var ld = [];
		angular.forEach(loggedInRestaurant.deals, function(value){
			var end = new Date(value.endDate);
			var start = new Date(value.startDate);
			if(end >today){	
				ld.push(value);//**SET**//			
			};
		});
		var xend = new Date(current_deal.endDate);console.log(xend);
		var xstart = new Date(current_deal.startDate);
		
		if(xend < today){
			console.log(current_deal.deal_name);
			if(ld > 0){
				console.log("bigger");
				current_deal = ld[0];
				fbArray[loggedInRestaurant].current_deal = ld;
				fbArray.$save(restaurantIndex).then(function(){
					console.log("saved");
					return current_deal;
				});	
			}else{
				console.log("no deal");
				current_deal = {deal_name: "No deal today"};
				return current_deal;
			}
			
		}else{
			return current_deal;
		}
		
		
	
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	mainFactory.setNewCurrentDeal = function(newCurrentdeal){
		var xend = new Date(newCurrentdeal.endDate);console.log(xend);
		var xstart = new Date(newCurrentdeal.startDate);
		
		if(xend >= today){
			console.log(true);
			console.log(newCurrentdeal.deal_name);
			if(xstart <= today){
				console.log(true);
				fbArray[restaurantIndex].current_deal = newCurrentdeal;
			}
		}
		
		fbArray.$save(restaurantIndex).then(function(){
			$location.path('/page201/page100');
		});
	}
		
	mainFactory.setCurrentDeal = function(){ /***********************************ALERT NOT FIRING OR SAVING CORRECTLY*/
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
		console.log(deals);
		
		
		for(var i = 0; i<deals.length; i++){
	
			var end = new Date(deals[i].endDate);
			var start = new Date(deals[i].startDate);
			
			
			if(end >today){//think about using the start here
				
				liveDeals[i] = deals[i]; //**SET*/
			};
		}
		
		
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
	
	/*mainFactory.resetHistoricalDeals = function(){
		historicalDeals = [];
		liveDeals = [];
	};*/
	//fire off the history ctrl	will work provided the livedealsctrl has been initilized
						
	mainFactory.getReservations = function(){//stick this function one factory down// actually get mainFactory.getCurrentUser will work
		var reservations = [];
		console.log(currentUser);
		if(currentUser.bookings !== undefined){
			reservations = currentUser.bookings;
			
		}else{
			reservations = {name: "You currently have no reservations"}
		}
		console.log(reservations);
		return reservations;
	}
	
	mainFactory.getBookings = function(){
		var bookings = [];
		var b = fbArray[restaurantIndex].bookings;
		var xtoday = today.toDateString();
		console.log(xtoday);
		
		angular.forEach(b, function(value){
			
		//console.log(value.reservation_date);
		console.log(value);
			
			//today = today.toDateString();
			if(value.reservation_date == xtoday){
				console.log("hjidr");
				bookings.push(value);
			}
		})
		
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
		console.log(currentUser);
		return currentUser;
	}
	
	mainFactory.getToday = function(){
		return today;
	}
	
	mainFactory.getLiveDeals = function(){
		
		var liveDeals=[];/*???*/
		var d = loggedInRestaurant.deals;
		angular.forEach(d, function(value){
			var end = new Date(value.endDate);
			var start = new Date(value.startDate);
			if(end >today){	
				liveDeals.push(value);//**SET**//			
			};
		});
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
		
		var historicalDeals=[];
		var d = loggedInRestaurant.deals;
		angular.forEach(d, function(value){
			console.log(value);	
			var end = new Date(value.endDate);
			var start = new Date(value.startDate);
			if((today >= end) || (value.uptake >= value.numberAvailable)){	
				historicalDeals.push(value);//**SET**//			
			};
		});
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
