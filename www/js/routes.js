angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   .state('tabs', {
    url: '/page1',
    templateUrl: 'templates/tabs.html',
    abstract:true
  })

  .state('tabs2', {
    url: '/page201',
    templateUrl: 'templates/tabs2.html',
    abstract:true
  })
  	  
	  
	  .state('tabs.myAccount', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/myAccount.html',
        controller: 'myCustomerAccountCtrl'
      }
    }
  })

  .state('tabs.liveDeals', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/liveDeals.html',
        controller: 'liveDealsController as main'
      }
    }
  })
  
  .state('tabs2.restaurantMapView', {
    url: '/restaurantMapView',
	   views: {
      'tab24': {
        templateUrl: 'templates/restaurantMapView.html',
        controller: 'liveDealsController as main'  
	  }
	}
	  
  })

  .state('tabs.myReservations', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/myReservations.html',
        controller: 'reservationCtrl'
      }
    }
  })

  .state('tabs.refineYourSearch', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/refineYourSearch.html',
        controller: 'liveDealsController'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/page10',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabs.tableBooked', {
    url: '/page11',
    views: {
      'tab2': {
        templateUrl: 'templates/tableBooked.html',
        controller: 'tableBookedCtrl'
      }
    }
  })

  .state('pleaseTryAgain', {
    url: '/page13',
    templateUrl: 'templates/pleaseTryAgain.html',
    controller: 'pleaseTryAgainCtrl'
  })

  /*.state('tabs.bookingDetails', {
    url: '/page15',
    views: {
      'tab3': {
        templateUrl: 'templates/bookingDetails.html',
        controller: 'bookingDetailsCtrl'
      }
    }
  })*/

  .state('welcomeToGrababite', {
    url: '/page14',
    templateUrl: 'templates/welcomeToGrababite.html',
    controller: 'welcomeToGrababiteCtrl'
  })
  
  //RESTAURANT ROUTES////////////////////////////////////////////////////////////////////////
  .state('tabs2.TodaysDeals', {
    url: '/page100',
    views:{
      'tab21':{
    templateUrl: 'templates/todaysDeals.html',
    controller: 'todayDealsCtrl'
  }
  }
  })

  .state('restaurantAccount', {
    url: '/page101',
    templateUrl: 'templates/restaurantAccount.html',
    controller: 'restaurantAccountCtrl'
  })

  .state('tabs2.newDeal', {
    url: '/page102',
    views:{
      'tab23':{
    templateUrl: 'templates/newDeal.html',
    controller: 'newDealsCtrl'
  }
  }
  })

  .state('history', {
    url: '/history',
    templateUrl: 'templates/history.html',
    controller: 'pastDealsCtrl as main' 
  })

  .state('pastDeals', {
    url: '/page103', 
    templateUrl: 'templates/pastDeals.html',
    controller: 'pastDealEditCtrl'
  })
  
  .state('editLiveDeal', {
    url: '/editLiveDeal', 
    templateUrl: 'templates/editLiveDeal.html',
    controller: 'editDealsCtrl' 
  })

  .state('dealInfo', {
    url: '/dealInfo', 
    templateUrl: 'templates/dealInfo.html',
    controller: 'liveDealsController as main' 
  })

  .state('restLiveDeals', {
    url: '/page105',
    templateUrl: 'templates/restLiveDeals.html',
    controller: 'liveDealsController as main'
  })
  
  .state('tabs2.myDeals', {
    url: '/myDeals',
    views:{
      'tab22':{
    templateUrl: 'templates/myDeals.html',
    controller: 'myDealsCtrl'
  }
  }
  })
  
  .state('tabs2.bookings', {
    url: '/bookings',
    views:{
      'tab24':{
    templateUrl: 'templates/bookings.html',
    controller: 'bookingsCtrl'
  }
  }
  })
  
  .state('tabs2.customerBookingDetails', {
    url: '/customerBookingDetails',
    views:{
      'tab24':{
    templateUrl: 'templates/customerBookingDetails.html',
    controller: 'customerBookingDetailsCtrl'
  }
  }
  })
  
.state('restaurantBookings', {
    url: '/restaurantBookings',
    templateUrl: 'templates/restaurantsBookings.html',
    controller: 'liveDealsController as main'
  })
  
  .state('analytics', {
    url: '/analytics',
    templateUrl: 'templates/analytics.html',
    controller: 'liveDealsController as main'	  
  })
  
  .state('analyticsByDealName', {
    url: '/analyticsByDealName',
    templateUrl: 'templates/analyticsByDealName.html',
    controller: 'analyticsCtrl'
  })
  
  .state('analyticsByDateRange', {
    url: '/analyticsByDateRange',
    templateUrl: 'templates/analyticsByDateRange.html',
    controller: 'liveDealsController as main'
  })
  
  .state('analyticsByDate', {	
    url: '/analyticsByDate',
    templateUrl: 'templates/analyticsByDate.html',
    controller: 'analyticsByDateCtrl'
  })
  
  .state('customerSignUpRestEd', {
    url: '/customerSignUpRestEd',
    templateUrl: 'templates/customerSignUpRestEd.html',
    controller: 'customerSignUpCtrl'
  })
  
  .state('customerSignUp', {
    url: '/customerSignUp',
    templateUrl: 'templates/customerSignUp.html',
    controller: 'customerSignUpCtrl'
  })
  
  .state('reserveTable', {
    url: '/reserveTable',  
	templateUrl: 'templates/reserveTable.html',
	controller: 'reserveTableCtrl'
      
  })
  
  .state('custOrRest', {
    url: '/custOrRest',
	templateUrl: 'templates/custOrRest.html',
	controller: 'customerSignUpCtrl'    
  })



$urlRouterProvider.otherwise('/login');



});
