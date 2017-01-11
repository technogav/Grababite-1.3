angular.module('app.services', ['firebase'])

.factory('RestaurantFactory', ['$firebaseArray', function($firebaseArray){

/////////FETCH RESTAURANTS FROM FIREBASE///////////////////////////////////////////////////

//all this could go in the getRestaurants function to avoid console errors


////////////////////////////////////////////////////////////////////////////

	var rFactory = this;

var ref = firebase.database().ref('restaurants/');//RETURNING OBJECT
var fbArray = $firebaseArray(ref);
//cannot create a child reference because of the poxy JSON UID numbers firebase kindly creates!
	//this is litterly driving me insane coz i cant find any relevant help online
	
	var rests = [];
	var loggedInRestaurant = [];
	var deals = [];
	var currentDeal = [];
	var loggedInName = "Gavins Grub";//this prob needs to be in all controllers
	
	fbArray.$loaded().then(function(data) {
		console.log(fbArray.$id);
		angular.forEach(data, function(value) {
			rests.push(value);
			
			if(value.name === loggedInName){
				loggedInRestaurant = value;
				deals = value.deals;			
				
			}
			
			angular.forEach(deals, function(value) {
				var x = new Date(value.startDate);
				var today = new Date();
				//if deal available set currentDeal
				if((today > x) && (value.uptake < value.numberAvailable)){		
					currentDeal = value;
				}
			});
			
			
		});
			
	});
	rFactory.setEditdeal = function(deal){

		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				
				angular.forEach(value.deals, function(value,key){
					
					if(value.deal_name === deal.deal_name){
						//console.log(key);//this give the index of the deal
						
						value.startDate = new Date();	
						value.endDate = "Thu Jan 20 2017";
						value.uptake = 0;
	
						
						//using $add creates a new node on the top level. cannot drill down into the json to write or update
						fbArray.$save(value).then(function(){
							console.log("bananas");
						})
					}
				})
			}
			
		})
	}
	
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
	
	rFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
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


	return rFactory;

}])

.service('BlankService', [function(){

}]);
