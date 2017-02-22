angular.module('app.directives', [])

.directive('googleplace', function() {
    
})
//test directive
.directive("test", function($location){
	var filteredUrl = $location.absUrl();
	filteredUrl = filteredUrl.substr(filteredUrl.lastIndexOf("/")+ 1);
	return {
		template: menu,
		scope: true
	}
	
})
//directive to disable side menu on ionic	
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}]);
