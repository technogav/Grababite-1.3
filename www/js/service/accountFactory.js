angular.module('accountFactory', ['firebase'])

.factory('accountFactory', ['$firebaseArray', 'mainFactory', function($firebaseArray, mainFactory){
	
	
	var accountFactory = this;
	
	
	accountFactory.initVariables = function(account_name){
		mainFactory.initVars(account_name);
	}
	//VARIABLES//
	var customers = mainFactory.getCusts();
	var currentUser = [];
	
	//SETTERS//
	accountFactory.refreshCustomerList = function(){
		mainFactory.refreshCustomerList();
	}
	
	accountFactory.setCurrentUser = function(user){
		//console.log(user);
		mainFactory.setCurrentUser(user);
	}
	
	
	//GETTERS//
	accountFactory.getCustomers = function(){
		return customers;
	}
	
	return accountFactory;
	
}]);