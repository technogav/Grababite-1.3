angular.module('customerFactory', ['firebase'])

.factory('customerFactory', ['$firebaseArray', '$firebaseObject', 'mainFactory',
							 function($firebaseArray, $firebaseObject, mainFactory){

	var cFactory = this;
		var currentUser = [];
		var reservation = [];
								 
		cFactory.getCurrentUser = function(){
			console.log(currentUser);
			return currentUser;
		}
		
		cFactory.getCurrentUser = function(){
			return mainFactory.getCurrentUser();
		}
		
		cFactory.getReservations = function(){
			
			var reservations = mainFactory.getReservations();
			return reservations;
		};
								 
		cFactory.setReservation = function(r){
			reservation = r;
		};
		cFactory.getReservation = function(){
			return reservation;
		}
		
		cFactory.setUpdateAccountInfo = function(account){
			console.log(account);
			mainFactory.setUpdateAccountInfo(account);
		}
		
		
	
	return cFactory;

}]);
