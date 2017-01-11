angular.module('app.services', ['firebase'])

.factory('RestaurantFactory', ['$firebaseArray', function($firebaseArray){

/////////FETCH RESTAURANTS FROM FIREBASE///////////////////////////////////////////////////

//all this could go in the getRestaurants function to avoid console errors


////////////////////////////////////////////////////////////////////////////

	var rFactory = this;

var ref = firebase.database().ref('restaurants/');//RETURNING OBJECT
var fbArray = $firebaseArray(ref);
	var rests = [];
	var loggedInRestaurant = [];
	var deals = [];
	var currentDeal = [];
	var loggedInName = "Gavins Grub";//this prob needs to be in all controllers
	
	fbArray.$loaded().then(function(data) {
		angular.forEach(data, function(value) {
			rests.push(value);
			
			if(value.name === loggedInName){
				loggedInRestaurant = value;
				rFactory.getLoggedInRestaurant = function(){ //this is returning an empty array
					return loggedInRestaurant;
				};
				deals = value.deals;			
				
			}
			
			angular.forEach(deals, function(value) {
				var x = new Date(value.startDate);
				var today = new Date();
				if((today > x) && (value.uptake < value.numberAvailable)){
					
					currentDeal = value;//dealsCtrl
					//console.log(currentDeals);
				}
			});
			
			
		});
			
	});
	var dealsByDate = [];
	rFactory.setDealAnalyticsByDate = function(deals){
		console.log(deals);
		dealsByDate = deals;
	}
	rFactory.getDealAnalyticsByDate = function(){
		return dealsByDate;
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
		fbArray.$add(restaurant);
	};
	
	rFactory.getDealToEdit = function(){
		return dealToEdit;
	};
	
	rFactory.getCurrentDeal = function(){
		return currentDeal;
	};
	
	
	
	rFactory.getDeals = function(){
		return deals;
	};
	
	rFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	}

	rFactory.getAllRestaurants = function(){
		return rests;		
	};

	/*rFactory.addRestaurant = function(restaurant){
		var coords = [53.3358699, -6.2635529];
		restaurant.id = 67887;
		restaurant.coords = coords;

		console.log(restaurant.name);
		restaurants.$add(restaurant);
	}

	rFactory.updateRestaurant = function(restaurant){
		restaurants.$save(restaurant);
	}

	rFactory.delete = function(reataurant){
		restaurants.$remove(restaurant)
	}*/







	return rFactory;

}])

.service('BlankService', [function(){

}]);
