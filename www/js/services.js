angular.module('app.services', [])

.factory('RestaurantFactory', [function(){

/////////FETCH RESTAURANTS FROM FIREBASE///////////////////////////////////////////////////

//all this could go in the getRestaurants function to avoid console errors


////////////////////////////////////////////////////////////////////////////

	var rFactory = this;




	rFactory.getRestaurants = function(){

var restaurants = [];

		return restaurants;
	};

	/*rFactory.addRestaurant = function(restaurant){
		var coords = [53.3358699, -6.2635529];
		restaurant.id = 67887;
		restaurant.coords = coords;

		console.log(restaurant.name);
		restaurants.$add(restaurant);
	}

	rFactory.updateRestaurant = function(restaurant){
		restaurants.$save(restaurant);
	}

	rFactory.delete = function(reataurant){
		restaurants.$remove(restaurant)
	}*/







	return rFactory;

}])

.service('BlankService', [function(){

}]);
