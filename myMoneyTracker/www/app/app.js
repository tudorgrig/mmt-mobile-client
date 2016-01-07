angular.module('myMoneyTracker', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('home',{
			abstract : true,
			url : "/home",
			templateUrl: "app/home/home.html"
		})

		.state('home.expenses', {
			url:"/expenses",
			views: {
				"tab-expenses" : {
					templateUrl : "app/home/expenses.html"
				}
			}
		})

		.state('home.incomes', {
			url:"/incomes",
			views: {
				"tab-incomes" : {
					templateUrl : "app/home/incomes.html"
				}
			}
		})

		.state('home.statistics', {
			url:"/statistics",
			views: {
				"tab-stats" : {
					templateUrl : "app/home/statistics.html"
				}
			}
		})

		.state('home.account', {
			url:"/account",
			views: {
				"tab-account" : {
					templateUrl : "app/home/account.html"
				}
			}
		})

		.state('app', {
			url : "/app",
			templateUrl: "app/layout/expense-layout.html"
		});
	$urlRouterProvider.otherwise('/home/expenses');
});