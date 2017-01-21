angular.module('customerFactory', ['firebase'])

.factory('customerFactory', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){

	var rFactory = this;
	
	return rFactory;

}])

.service('BlankService', [function(){

}]);
