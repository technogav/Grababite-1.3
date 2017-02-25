angular.module('dealsAndEditFactory', ['firebase'])

.factory('dealsAndEditFactory', ['$firebaseArray', 'mainFactory', '$location', function($firebaseArray, mainFactory, $location){
	//set/reset currenty deals
	var dealFactory = this;
	
	var fbArray = mainFactory.getFbRestaurantArr();
	var deals = mainFactory.getDeals();
	var dealToEdit = [];
	
	var today = mainFactory.getToday();
	var restaurantIndex = mainFactory.getRestaurantIndex();//?

	var currentDeal = [];
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var loggedInName = mainFactory.getLoggedInName();
	

	dealFactory.setCurrentDeal = function(){
		mainFactory.setCurrentDeal();
	}
	
	dealFactory.resetCurrentDeal = function(){
		mainFactory.resetCurrentDeal();
	}
	//set/reset historical deals
	dealFactory.setHistoricalDeals = function(){
		mainFactory.setHistoricalDeals();	
	};
	dealFactory.resetHistoricalDeals = function(){
		mainFactory.resetHistoricalDeals();	
	};

	dealFactory.resetLiveDeals = function(){
		mainFactory.resetLiveDeals();
	}
	
	dealFactory.checkForFirstTimeUser = function(){
		mainFactory.checkForFirstTimeUser();
	}
	
	
	dealFactory.setLiveDeals = function(){
		mainFactory.setLiveDeals();
	}
	
	dealFactory.getCurrentDeal = function(){
		
		var currentDeal = mainFactory.getCurrentDeal();
		//console.log(currentDeal);
		return currentDeal;
	}
	
	dealFactory.getLiveDeals = function(){
		//var liveDeals = mainFactory.getLiveDealsFromDB();
		var liveDeals = mainFactory.getLiveDeals();
		return liveDeals;
	}
	
	
	dealFactory.setDealToEdit = function(deal){
		//console.log(deal);
		dealToEdit = deal;	
	};
	
	dealFactory.setAddNewDeal2 = function(deal){
		console.log(deal);
		mainFactory.setAddNewDeal2(deal);
	}
	
	
	/*dealFactory.setAddNewDeal = function(deal){
		console.log("factory");
		//console.log(loggedInName);
		
		angular.forEach(fbArray, function(value,key){
			//console.log(value.account_name);
			if(value.account_name === loggedInName){
				//console.log(value);
				var restaurantIndex = key;
			console.log(key);
				var id = 0;
				
				var startDate = deal.startDate.toDateString();
				var endDate = deal.endDate.toDateString();
				var startTime = deal.startTime.toTimeString();
				var endTime = deal.endTime.toTimeString();
				var dealsObject = [{id: id,
									conditions: deal.conditions,
									deal_name: deal.name,
									details: deal.description,
									numberAvailable: deal.numOfDeals,
									startDate: startDate,
									endDate: endDate,
									startTime: startTime,
									endTime: endTime,
									uptake:"0"}];
				
				console.log(dealsObject);
				if(value.deals == undefined){
					
					value.deals = dealsObject;
				}else{
					value.deals.push({id: id,
									conditions: deal.conditions,
									deal_name: deal.name,
									details: deal.description,
									numberAvailable: deal.numOfDeals,
									startDate: startDate,
									endDate: endDate,
									startTime: startTime,
									endTime: endTime,
									uptake:"0"});
				}
//this.setSaveDeal(newDeal); will update the current deal in the database
				fbArray.$save(restaurantIndex).then(function(){
					alert("Deal Added. You can edit deal at any time in the control panel");
					
				});

				
			}
		});
	}*/
	
	dealFactory.setReactivateDeal = function(deal){	
		mainFactory.setReactivateDeal(deal);		
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
	
/*func: to pass in edited details obj to be checked if the deal is within bounds	*/
	dealFactory.setSaveDeal = function(deal){
		mainFactory.setNewCurrentDeal(deal);
		/*save any changes to the FB ref then change views*/
		fbArray.$save(restaurantIndex).then(function(){
			$location.path('/page201/page100');
		});
	}
	
	dealFactory.getCurrentUser = function(){
		var currentUser = mainFactory.getCurrentUser();
		//console.log(currentUser);
		return currentUser;
	}
	dealFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	}
	
	dealFactory.getSignUpCustomer = function(){
		var signUpCustomer = mainFactory.getSignUpCustomer();
		return signUpCustomer;
	}
	dealFactory.getDeals = function(){
		return deals;
	}
	
	/*dealFactory.getCurrentDeal = function(){
		
		return currentDeal;
	}*/
	
	dealFactory.getHistoricalDeals = function(){
		var historicalDeals = mainFactory.getHistoricalDeals();
		return historicalDeals;
	}
	
	
	dealFactory.getDealToEdit = function(){
		return dealToEdit;
	};
	
	return dealFactory;

}]);
