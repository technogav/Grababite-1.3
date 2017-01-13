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
	var loggedInName = "Gavins Grub";
	
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
				var restaurantIndex = key;
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
					alert("Deal Added. You can edit deal at any time in the control panel.");
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
