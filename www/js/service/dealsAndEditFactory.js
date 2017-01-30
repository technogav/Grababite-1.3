angular.module('dealsAndEditFactory', ['firebase'])

.factory('dealsAndEditFactory', ['$firebaseArray', 'mainFactory', function($firebaseArray, mainFactory){

	var dealFactory = this;
	var fbArray = mainFactory.getFbRestaurantArr();
	var deals = mainFactory.getDeals();
	var dealToEdit = [];
	var liveDeals = mainFactory.getLiveDeals();
	var today = mainFactory.getToday();
	var restaurantIndex = mainFactory.getRestaurantIndex();
	//console.log(restaurantIndex);
	var historicalDeals = mainFactory.getHistoricalDeals();
	var currentDeal = mainFactory.getCurrentDeal();
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var loggedInName = mainFactory.getLoggedInName();
	
	
	dealFactory.setDealToEdit = function(deal){
		console.log(deal);
		dealToEdit = deal;
	};
	
	dealFactory.setAddNewDeal = function(deal){
		console.log(deal);
		console.log(loggedInName);
		
		angular.forEach(fbArray, function(value,key){
			//console.log(value.account_name);
			if(value.account_name === loggedInName){
				//console.log(value);
				var restaurantIndex = key;
			
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

				
					


				fbArray.$save(restaurantIndex).then(function(){
					alert("Deal Added. You can edit deal at any time in the control panel");
					
				});

				
			}
		});
	}
	
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
