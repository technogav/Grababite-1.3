angular.module('app.services', [])

.factory('RestaurantFactory', [function(){
	var rFactory = this;
	
	var restaurants = [
			{
				"id": "foo",
				"name": "Dublin Castle",
				"description": "Dublin castle, food fit for a king",
				"deal": "2 for One dining tonight",
				"coords": [53.3428848 , -6.2674266]
				},
				{
				"id": 2,
				"name": "The Brazen Head",
				"description": "Restaurant with BOLD flavour",
				"deal": "2 for One dining tonight",
				"coords": [53.3449312, -6.2763315]
			},
		{
				"id": 3,
				"name": "St. James",
				"description": "'Fresh Food' served in the comfort of your own bed (or trolly)",
				"deal": "2 for One dining tonight",
				"coords": [53.3400471, -6.2941736]
				},
				{
				"id": 4,
				"name": "Dicey's",
				"description": "Roll on up and give us a 'chance'",
				"deal": "2 for One dining tonight",
				"coords": [53.3358639, -6.2635589]
			}
		];
	
	rFactory.getRestaurants = function(){
		
		return restaurants;
	};
	
	rFactory.addRestaurantDetails = function(restaurant){
		restaurants.push(restaurant);
	};
	return rFactory;
	
}])

.service('BlankService', [function(){

}]);