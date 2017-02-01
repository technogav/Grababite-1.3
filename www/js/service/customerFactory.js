angular.module('customerFactory', ['firebase'])

.factory('customerFactory', ['$firebaseArray', '$firebaseObject', 'mainFactory',
							 function($firebaseArray, $firebaseObject, mainFactory){

	var cFactory = this;
		var currentUser = [];
								 
		cFactory.getCurrentUser = function(){
			console.log("currentUser");
			return currentUser;
		}
	
	return rFactory;

}])

.service('BlankService', [function(){

}]);
