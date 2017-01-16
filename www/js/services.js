angular.module('app.services', ['firebase'])

.factory('RestaurantFactory', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){

	var rFactory = this;

	var ref = firebase.database().ref('restaurants/');
	var fbArray = $firebaseArray(ref);
	var fbObj = $firebaseObject(ref);
	
	var rests = [];
	var loggedInRestaurant = [];
	var deals = [];
	var currentDeal = [];
	var liveDeals = [];
	var loggedInName = "Gavins Grub";
	var restaurantIndex = 8;
	var today = new Date();
	var historicalDeals = [];
	fbArray.$loaded().then(function(data) {
		//console.log(fbArray.$id);
		
		angular.forEach(data, function(value,key) {
			rests.push(value);
			
			if(value.name === loggedInName){
				restaurantIndex = key;
				loggedInRestaurant = value;
				deals = value.deals;
						
			
				angular.forEach(deals, function(value) {
					//console.log(value);
				var end = new Date(value.endDate);
					//console.log(end);
				var start = new Date(value.startDate);
					//console.log(start);
				//if deal available set currentDeal
					
				if((today <= end) && (value.uptake < value.numberAvailable)) {	
					//console.log(true);
					currentDeal.push(value);
					
					if(currentDeal.length > 1){
						alert("You currently have two deals or more active for today. This can cause trouble, please deactivate one in the dashboard.")
					}
					
					
					//brittle coz no way of making sure only one deal is withing the params so only last deal gets saved
					//also end date is not taken into account
				}
					
				if((today >= end) || (value.uptake >= value.numberAvailable)){	
						//console.log(true);
						
							historicalDeals.push(value);
							
					}	
					
				if(end >today){
					liveDeals.push(value);
				}
				
				
			});	
				
			}
			
			
		});		
	});
	rFactory.setEditdeal = function(deal){		
		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				var restaurantIndex = key;
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
	//must see how to DRY this code restaurantIndex for example
	rFactory.setRemoveDeal = function(deal){
		console.log(deal);
		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				var restaurantIndex = key;
				console.log(restaurantIndex);
				angular.forEach(value.deals, function(value,key){
					if(value.deal_name === deal.deal_name){
						var dealIndex = key;
						console.log(dealIndex);
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
	
	rFactory.setAddNewDeal = function(deal){
		//console.log(deal);
		angular.forEach(fbArray, function(value,key){
			
			if(value.name === loggedInName){
				console.log(deal);
				var restaurantIndex = key;
			
				var id = value.deals.length;
				id = id + 1;
				
				var startDate = deal.startDate.toDateString();
				var startTime = deal.startTime.toTimeString();
				var endTime = deal.endTime.toTimeString();

				value.deals.push(
					{
						id: id,
						conditions: deal.conditions,
						deal_name: deal.name,
						details: deal.description,
						numberAvailable: deal.numOfDeals,
						startDate: startDate,
						startTime: startTime,
						endTime: endTime,
						uptake:"0"
				});


				fbArray.$save(restaurantIndex).then(function(){
					alert("Deal Added. You can edit deal at any time in the control panel");
					console.log("Deal now added"); //updateing databse but not updateing the $scope
				});

				
			}
		});
	}
	/*main.addDeal = function(){
		//console.log($scope.fbRestsObj);
				$scope.fbRestsObj.$loaded().then(function(data) {
						angular.forEach(data, function(value) {
							console.log(value);
							
							
							if(value.name == $scope.loggedInName){
								var d = new Date();
								//this will break easily when a deal is deleted
								//maybe loop tru value.deals to find the highest id then add one
								var id = value.deals.length;
								var id = id + 1;
								$scope.newDeal.startDate = $scope.newDeal.startDate.toDateString();
								$scope.newDeal.startTime = $scope.newDeal.startTime.toTimeString();
								$scope.newDeal.endTime = $scope.newDeal.endTime.toTimeString();

									value.deals.push(
										{
											id: id,
											conditions: $scope.newDeal.conditions,
											deal_name: $scope.newDeal.name,
											details:$scope.newDeal.description,
											numberAvailable:$scope.newDeal.numOfDeals,
											startDate:$scope.newDeal.startDate,
											startTime:$scope.newDeal.startTime,
											endTime:$scope.newDeal.endTime,
											uptake:"0"
									});

									$scope.fbRestsObj.$save(ref).then(function(){
									console.log("new deal added");
									$location.path('/page201/page100');
								});
							}
						});
					});
			}*/

		/*$scope.fbRestsObj.$loaded().then(function(data) {
				angular.forEach(data, function(value) {
					//think of way to target prooper
					console.log(value);

					if(value.name == "Gavins Grub"){


							angular.forEach(value.deals, function(value) {
								console.log(value);
								angular.forEach(value,function(value){
										angular.forEach(value,function(value){
											console.log(value);
										})
								})
							});
							$scope.fbRestsObj.$save(ref).then(function(){

						//	console.log("new deal added");
							})
					}else{
						//console.log("not logged in");
					}
				});
			});



	}


	//use this for update deals

	/*$scope.fbRestsObj.$loaded().then(function(data) {

		angular.forEach(data, function(value) {
			if(value.id == "2"){
				value.deals.dealDetails = "nice deal";
				value.deals.uptake = "2";
				console.log(value);
				console.log(data);
				$scope.fbRestsObj.$save(ref).then(function(){

					console.log("jwedjkfre");
				})
				return;
			}


	 });


 });*/
	
	
	
	
	
	
	rFactory.setSaveDeal = function(deal){
		fbArray.$save(restaurantIndex).then(function(){
			alert("deal changed in the database succesfully"); //updateing databse but not updateing the $scope
			
		});
	}
	
	
	
	rFactory.setAnalyticsSearchDate = function(search){
		
		var analyticsSearchByDate = new Date(search);
		//console.log(analyticsSearchByDate);
		
		var result = [];					   
		angular.forEach(deals,function(value){
			//console.log(value.startDate);
			var start = new Date(value.startDate);
			if(analyticsSearchByDate < start){				
				result.push(value);
			};
		});
		console.log(result);
		return result;
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
	
	rFactory.getLoggedInRestaurant = function(){
		return loggedInRestaurant;
	}
	
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


	return rFactory;

}])

.service('BlankService', [function(){

}]);
