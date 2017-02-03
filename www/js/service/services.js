angular.module('app.services', ['firebase'])

.factory('RestaurantFactory', ['$firebaseArray', '$firebaseObject', 'mainFactory', 
							   function($firebaseArray, $firebaseObject, mainFactory){

	var rFactory = this;
	rFactory.setCurrentDeal = function(){
		mainFactory.setCurrentDeal();
	}
	//var ref = mainFactory.getFbRestaurantArr();
	
	//var custRef = firebase.database().ref('customers/');
	var fbArray = mainFactory.getFbRestaurantArr();
	var fbCustomerArray = mainFactory.getFbCustomersArr();
	var loggedInName = mainFactory.getLoggedInCredentials();
	var rests = mainFactory.getRests();
	var loggedInRestaurant = mainFactory.getLoggedInRestaurant();
	var restaurantIndex = 8;
	var today = mainFactory.getToday();
	var account_type = "";
	
								   
	rFactory.setAccountType = function(acc_type){
		account_type = acc_type;
	}
	rFactory.getAccountType = function(){
		return account_type;
	}
	/*rFactory.setEditdeal = function(deal){		
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
	};*/
	//must see how to DRY this code restaurantIndex for example
	/*rFactory.setRemoveDeal = function(deal){
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
	}*/
	
	/*rFactory.setAddNewDeal = function(deal){
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
	}*/
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
	
	rFactory.getBookings = function(){
		var bookings = mainFactory.getBookings();
		console.log(bookings);
		return bookings;
	}
	
	
	rFactory.addNewRestaurantBooking = function(restaurant){
		//console.log(restaurant);
		//console.log(UID);
		angular.forEach(fbArray, function(value,key){
			if(value.account_name === restaurant.account_name){
				//console.log(value);
				//console.log(restaurant);
				
				console.log(fbArray[key]);
				
				fbArray.$save(key).then(function(){
					console.log("restaurant updated with booking object");
				});
				
			};
		});
		
		
	};
	
	rFactory.addNewCustomerBooking = function(customer, UID){
		console.log(UID);
		//console.log(customer);
		angular.forEach(fbCustomerArray, function(value,key){
			
			if(value.$id === UID){
				//console.log(value);
				//console.log(value.account_name);
				value = customer;
				fbCustomerArray.$save(key).then(function(){
					alert("Deal has been reserved");
					
				});
			}
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
			alert("deal changed in the database succesfully"); //updateing databse but not updateing the $scope
			
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
		fbArray.$add(restaurant);
	};
	
	var signUpCustomer = [];
								   
	rFactory.getSignUpCustomer = function(){
		mainFactory.setSignUpCustomer(signUpCustomer);
		return signUpCustomer;
	}							   
	rFactory.setCustomer = function(customer){
		signUpCustomer = customer;
		fbCustomerArray.$add(customer).then(function(){
			alert('customer added');
		});
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
		/*console.log(deal);
		console.log(restaurantUID);
		console.log(restaurant);*/
		reserveDeal = [deal,restaurant,restaurantUID];
	};
	
	
	rFactory.getReserveDeal = function(){
		//console.log(reserveDeal);
		return reserveDeal;
	}
	
	rFactory.getCurrentUser = function(){
		var currentUser = mainFactory.getCurrentUser();
		//console.log(currentUser);
		return currentUser;
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
			alert("deal now saved");
		})
	}


	return rFactory;

}])

.service('BlankService', [function(){

}]);
