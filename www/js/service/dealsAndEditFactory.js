angular.module('dealsAndEditFactory', ['firebase'])

.factory('dealsAndEditFactory', ['$firebaseArray', 'mainFactory', function($firebaseArray, mainFactory){

	var dealFactory = this;
	var fbArray = mainFactory.getFbRestaurantArr();
	var deals = mainFactory.getDeals();
	var dealToEdit = [];
	var liveDeals = mainFactory.getLiveDeals();
	var today = mainFactory.getToday();
	var restaurantIndex = mainFactory.getRestaurantIndex();
	console.log(restaurantIndex);
	var historicalDeals = mainFactory.getHistoricalDeals();
	var currentDeal = mainFactory.getCurrentDeal();
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var loggedInName = mainFactory.getLoggedInName();
	
	dealFactory.setDealToEdit = function(deal){
		console.log(deal);
		dealToEdit = deal;
	};
	
	dealFactory.setReactivateDeal = function(deal){		
		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				restaurantIndex = key;
				angular.forEach(value.deals, function(value,key){
					if(value.deal_name === deal.deal_name){
						var dealIndex = key;
						var resetUptake = 0;
						//get todays date and end date (30 days after today)
						
						var newEndDate = new Date();
						newEndDate.setDate(today.getDate()+30);
						//convert dates to string
						newEndDate = newEndDate.toDateString();
						today = today.toDateString();

						fbArray[restaurantIndex].deals[dealIndex].startDate = today;
						fbArray[restaurantIndex].deals[dealIndex].endDate = newEndDate;
						fbArray[restaurantIndex].deals[dealIndex].uptake = resetUptake;
						
						fbArray.$save(restaurantIndex).then(function(){
							console.log("deal now active"); //updateing databse but not updateing the $scope
						});
					}
				});
			}
		});
	};
	
	dealFactory.setRemoveDeal = function(deal){
		console.log(deal);
		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				
				restaurantIndex = key;
				
				angular.forEach(value.deals, function(value,key){
					if(value.deal_name === deal.deal_name){
						var dealIndex = key;
						//console.log(dealIndex);
						var dealtoRemove = fbArray[restaurantIndex].deals;
						
						console.log(dealtoRemove);
						
						fbArray.$remove(dealtoRemove).then(function(){
							console.log("deal now removed from database"); 
						});
					}
				});
			};
		});
	}
	
	dealFactory.setSaveDeal = function(deal){
		console.log(restaurantIndex);
		
		fbArray.$save(restaurantIndex).then(function(){
			alert("deal changed in the database succesfully"); 
			
		});
	}
	
	
	
	
	
	
	
	
	dealFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	}
	
	
	dealFactory.getDeals = function(){
		return deals;
	}
	
	dealFactory.getCurrentDeal = function(){
		return currentDeal;
	}
	
	dealFactory.getHistoricalDeals = function(){
		return historicalDeals;
	}
	
	dealFactory.getLiveDeals = function(){
		return liveDeals;
	}
	dealFactory.getDealToEdit = function(){
		return dealToEdit;
	};
	
	return dealFactory;

}]);
