angular.module('app.services', ['firebase'])

.factory('RestaurantFactory', ['$firebaseArray', '$firebaseObject', 'mainFactory', '$location', '$ionicPopup',
							   function($firebaseArray, $firebaseObject, mainFactory, $location, $ionicPopup){

	var rFactory = this;
	
	rFactory.initVariables = function(){
		mainFactory.initVariables();
	}
	//var ref = mainFactory.getFbRestaurantArr();
	
	//var custRef = firebase.database().ref('customers/');
	var fbArray = mainFactory.getFbRestaurantArr();
	var fbCustomerArray = mainFactory.getFbCustomersArr();
	var loggedInName = mainFactory.getLoggedInCredentials();
								   console.log(loggedInName);
	var rests = mainFactory.getRests();
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var restaurantIndex = null;
	var today = mainFactory.getToday();
	var account_type = "";
	
	rFactory.setCurrentUser = function(x){
		mainFactory.setCurrentUser(x);
	}							   
	rFactory.setAccountType = function(acc_type){
		account_type = acc_type;
	}
	rFactory.getAccountType = function(){
		return account_type;
	}
	
	rFactory.getRestsWithCurrentDeal = function(){
		var restsWithCurrentDeal = mainFactory.getRestsWithCurrentDeal();
		return restsWithCurrentDeal;
	}
	
	var bookingDetail = [];
	rFactory.setBookingDetail = function(b){
		console.log(b);
		bookingDetail = b;
		
	}
	
	rFactory.getBookingDetail = function(){
		
		return bookingDetail;
	}
	
	rFactory.getReservations = function(){
		var reservations = mainFactory.getReservations();
		//console.log(reservations);
		return reservations;
	}
	
	rFactory.getBookings = function(){
		var bookings = mainFactory.getBookings();
		//console.log(bookings);
		return bookings;
	}
	
	
	rFactory.addNewRestaurantBooking = function(restaurant, reserveDeal){//re-write this function
		console.log(restaurant.current_deal);
		console.log(restaurant);
		index = "";
		//target the restaurant and increment the current_deal.uptake
		/*angular.forEach(fbArray, function(value,key){	
			if(value.$id === restaurant.$id){
				index = value.$id;
				restaurant.current_deal.uptake = restaurant.current_deal.uptake + 1;
				fbArray[key] = restaurant;
				
				
				
			}
		});*/
		
		//console.log(fbArray[index]);
		//cur = cur++;
		
		
		var index = null;
		angular.forEach(fbArray, function(value,key){
			//identify the restaurant
			index = key
			
			if(value.account_name === restaurant.account_name){
				console.log("account names match");
				//reserveDeal.uptake = parseInt(reserveDeal.uptake) +1;
				//console.log(uptake);
				angular.forEach(restaurant.deals, function(value){
					
					if(value.deal_name === reserveDeal.deal_name){
						value.uptake = parseInt(value.uptake) + 1;
						console.log(value.uptake);
					}
				});
				
				//console.log(key);
//				console.log(fbArray[key].current_deal.uptake);
				//value.current_deal.uptake = value.current_deal.uptake + 1;
				
				
				fbArray[key].current_deal.uptake = parseInt(fbArray[key].current_deal.uptake) + 1;
				console.log(fbArray[key].current_deal.uptake);
				
				if(value.current_deal.uptake >= value.current_deal.numberAvailable){
						value.current_deal = null;
					}
				
			};
			
			
			
		});
		fbArray.$save(index).then(function(){
						//console.log("here");
						$location.path('/page1/page3');
					});
		
	};
	
	rFactory.addNewCustomerBooking = function(customer){
		//console.log(customer);
		//maybe get a global logged in customer index
		var index = null;
		angular.forEach(fbCustomerArray, function(value,key){
			
			if(value.account_name === customer.account_name){
				fbCustomerArray[key] = customer;
				/*//console.log(fbCustomerArray[key]);
				if(fbCustomerArray[key].bookings == undefined){
					fbCustomerArray[key].bookings = [];
					fbCustomerArray[key].bookings.push(value);
					console.log(fbCustomerArray[key].bookings);
				}else{
					fbCustomerArray[key].bookings.push(value);
				}*/
				index = key;
				
				
			}
		});
		console.log(index);
		fbCustomerArray.$save(index).then(function(){
			console.log("Deal has been reserved for the customer");
			var showAlert = function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Reserved',
						template: 'Your Deal has been reserved. Check the reservation tab for details.'
					});
				alertPopup.then(function(res) {

				});

			};
			showAlert();
		});
		/*fbArray.$loaded().then(function(data) {
			angular.forEach(data, function(value) {
				console.log(value);
			});
		});*/
		/**/
	};
	
	rFactory.setSaveDeal = function(deal){//where is deal being used hmmmm?
		fbArray.$save(restaurantIndex).then(function(){
			var showAlert = function() {
							var alertPopup = $ionicPopup.alert({
								title: 'Updated',
								template: 'Your Deal has been updated.'
							});
						alertPopup.then(function(res) {

						});
						showAlert();
					};
			
		});
	}
	
	
	var searchByDateArray = [];
	var searchDate = [];
	rFactory.setAnalyticsSearchDate = function(search){
		
		var analyticsSearchByDate = new Date(search);
		//console.log(analyticsSearchByDate);
		searchDate = search;
							   
		angular.forEach(deals,function(value){
			//console.log(value.startDate);
			var start = new Date(value.startDate);
			if(analyticsSearchByDate < start){
				searchByDateArray.push(value);
			};
		});
		console.log(searchByDateArray);
		return searchByDateArray;
	}
	rFactory.getDateFor = function(){
		return searchDate;
	}
		
	rFactory.setAnalyticsByDateRange = function(range){
		var result = [];
		var st = new Date(range[0]);
		var en = new Date(range[1]);
		
		angular.forEach(deals,function(value){
			var start = new Date(value.startDate);
			var end = new Date(value.endDate);
			/*console.log(value.deal_name);
			console.log(start);
			console.log(end);*/
			if(st < start){	
				console.log(value);
				if(!en >= end){
					console.log(value);
				}
			}
		});
		return result;
	}
	
	
	var dealsByDate = [];
	rFactory.setDealAnalyticsByDate = function(deals){
		console.log(deals);
		dealsByDate = deals;
	}
	rFactory.getDealAnalyticsByDate = function(){
		return searchByDateArray;
	}
	
	var dealsByRange = [];
	rFactory.setDealAnalyticsByRange = function(deals){
		console.log(deals);
		dealsByRange = deals;
	}
	
	var dealsByName = [];
	rFactory.setDealAnalyticsByName = function(deals){
		console.log(deals);
		dealsByName = deals;
	}
	
	var dealToEdit = [];
	rFactory.setDealToEdit = function(deal){
		console.log(deal);
		dealToEdit = deal;
	};
	
	rFactory.setRestaurant = function(restaurant){
		//create an alert to be fired on successful upload
		console.log("HERE");
		console.log(restaurant);
		var showAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Account edited',
				template: 'Restaurant added, you can now start adding deals.'
			});
			alertPopup.then(function(res) {
				
			});

		};
		
		//save to firebase
		fbArray.$add(restaurant).then(function(){		
			showAlert();
		//create a global loggedInRestaurant variable on the top level	
			mainFactory.refreshLoggedInrestaurant();
			$location.path('/login');
		});
	};
	
	var signUpCustomer = [];								   							   
	rFactory.setCustomer = function(customer){
		
		//populate glob variable
		signUpCustomer = customer;
		
		/*create alert yolk to be fired off on success*/
		var showAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Sign In',
				template: 'Please sign in on the credentials you just signed up with.'
			});
			alertPopup.then(function(res) {
				
			});

		};
		
		//save to firebase
		fbCustomerArray.$add(customer).then(function(){
			//showAlert();
		});
	}
	rFactory.getSignUpCustomer = function(){
		mainFactory.setSignUpCustomer(signUpCustomer);
		return signUpCustomer;
	}
	
	rFactory.getDealToEdit = function(){
		
		//for(var i =0; i <dealToEdit.length; i++){
			//dealToEdit = dealToEdit.startTime.substr(0,8);
			//dealToEdit = dealToEdit.endTime.substr(0,8);
		//}
		return dealToEdit;
	};
	
	
	
	rFactory.getCurrentDeal = function(){
		return currentDeal;
	};
	
	rFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	};
	
	rFactory.getDeals = function(){
		return deals;
	};
	
	
	
	rFactory.getLiveDeals = function(){
		return liveDeals;
	}

	rFactory.getAllRestaurants = function(){
		return rests;		
	};
	
	rFactory.getHistoricalDeals = function(){
		console.log(historicalDeals);
		return historicalDeals;
	}
	
	var reserveDeal = [];
	rFactory.setReserveDeal = function(deal, restaurantUID, restaurant){
		reserveTableUID = restaurantUID;
		reserveDeal = [deal,restaurant,restaurantUID];
	};
	
	
	rFactory.getReserveDeal = function(){
		//console.log(reserveDeal);
		return reserveDeal;
	}
	
	rFactory.getCurrentUser = function(){
		return mainFactory.getCurrentUser();
		
	}
	
	rFactory.setReservationDeal = function(deal){
		//target customer properly later
		var dealIndex = 0;
		for(var i = 0; i<deals; i++){
			if(deal.deal_name === deals[i].deal_name){
				dealIndex=i;
				break;
			}
		}
		fbArray[reserveTableUID].deals[dealIndex] = deal;
		fbArray.$save(reserveTableUID).then(function(){
			var showAlert = function() {
							var alertPopup = $ionicPopup.alert({
								title: 'Saved',
								template: 'Your Deal has been saved.'
							});
						alertPopup.then(function(res) {

						});
						showAlert();
					};
		})
	}


	return rFactory;

}])

.service('BlankService', [function(){

}]);
