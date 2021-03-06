// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', 
			   ['ionic',
				/*controllers*/
				'app.controllers', 
				'liveDealsController', 
				'dealsAndEditController', 
				'LoginCtrl', 
				'analyticsController',
				/*Services*/
				'app.services', 
				'mainFactory', 
				'dealsAndEditFactory', 
				'accountFactory', 
				'customerFactory',
				/*routes*/
				'app.routes',
				/*directives*/
				'app.directives',
				/*other*/
				'ngMap', 
				'ngCordova', 
				'firebase', 
				'ionic-timepicker', 
				'ionic-datepicker'])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $ionicConfigProvider.tabs.position('bottom');

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//Configure for datepicker
/*.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1)
      to: new Date(2018, 8, 1)
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })*/
