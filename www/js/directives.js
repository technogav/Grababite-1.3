angular.module('app.directives', [])

.directive('googleplace', function() {
    
})
.directive("test", function($location){
	var filteredUrl = $location.absUrl();
	filteredUrl = filteredUrl.substr(filteredUrl.lastIndexOf("/")+ 1);
	
	
	return {
		template: menu,
		scope: true
	}
});
//myApp.factory('myService', function() {});
