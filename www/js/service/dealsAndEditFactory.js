angular.module('dealsAndEditFactory', ['firebase'])

.factory('dealsAndEditFactory', ['$firebaseArray', 'mainFactory', '$location', function($firebaseArray, mainFactory, $location){
	//set/reset currenty deals
	var dealFactory = this;
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
	
	var fbArray = mainFactory.getFbRestaurantArr();
		var deals = mainFactory.getDeals();
	var dealToEdit = [];
	var liveDeals = mainFactory.getLiveDeals();
	var today = mainFactory.getToday();
	var restaurantIndex = mainFactory.getRestaurantIndex();//?
	//console.log(restaurantIndex);
	var historicalDeals = mainFactory.getHistoricalDeals();
	var currentDeal = mainFactory.getCurrentDeal();
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var loggedInName = mainFactory.getLoggedInName();
	
	dealFactory.setLiveDeals = function(){
		mainFactory.setLiveDeals();
	}
	
	dealFactory.getCurrentDealFromDB = function(){
		var currentDealFromDb = mainFactory.getCurrentDealFromDB();
		return currentDealFromDb;
	}
	
	dealFactory.setDealToEdit = function(deal){
		//console.log(deal);
		dealToEdit = deal;	
	};
	
	dealFactory.setAddNewDeal2 = function(deal){
		console.log(loggedInRestaurant);
	}
	
	
	dealFactory.setAddNewDeal = function(deal){
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
console.log(restaurantIndex);
				fbArray.$save(restaurantIndex).then(function(){
					alert("Deal Added. You can edit deal at any time in the control panel");
					
				});

				
			}
		});
	}
	
	dealFactory.setReactivateDeal = function(deal){	
		var deals = mainFactory.getDeals();
			
		angular.forEach(deals, function(value,key){
			if(value.deal_name === deal.deal_name){
				
				restaurantIndex = key;
				angular.forEach(value.deals, function(value,key){
					if(value.deal_name === deal.deal_name){
						
						var dealIndex = key;
						var resetUptake = 0;
						//get todays date and end date (30 days after today)
						var today = new Date();
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
		
		/*fbArray.$save(restaurantIndex).then(function(){
			$location.path('/page201/page100');	
		});*/
		mainFactory.setNewCurrentDeal(deal);
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
