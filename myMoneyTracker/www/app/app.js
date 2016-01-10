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


		.state('home.description', {
			url:"/description",
			views: {
				"tab-description" : {
					templateUrl : "app/home/description.html"
				}
			}
		})

		.state('home.register', {
			url:"/register",
			views: {
				"tab-register" : {
					templateUrl : "app/home/register.html"
				}
			}
		})

		.state('home.login', {
			url:"/login",
			views: {
				"tab-login" : {
					templateUrl : "app/home/login.html"
				}
			},
			controller: 'SignInCtrl'
		})

		.state('app', {
			abstract : true,
			url : "/app",
			templateUrl: "app/layout/menu-layout.html"
		})


		.state('app.expenses', {
			url:"/expenses",
			views: {
				"mainContent" : {
					templateUrl : "app/expenses/expenses.html"
				}
			}
		})

		.state('app.expense-detail', {
			url:"/expenses/:id",
			views: {
				"mainContent" : {
					templateUrl : "app/expenses/expense-detail.html"
				}
			}
		})

		.state('app.incomes', {
			url:"/incomes",
			views: {
				"mainContent" : {
					templateUrl : "app/incomes/incomes.html"
				}
			}
		})

		.state('app.categories', {
			url:"/categories",
			views: {
				"mainContent" : {
					templateUrl : "app/categories/categories.html"
				}
			}
		})

		.state('app.statistics', {
			url:"/statistics",
			views: {
				"mainContent" : {
					templateUrl : "app/statistics/statistics.html"
				}
			}
		})

		.state('app.account', {
			url:"/account",
			views: {
				"mainContent" : {
					templateUrl : "app/account/account.html"
				}
			}
		});

	$urlRouterProvider.otherwise('/home/description');
})

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tabs.home');
  };
  
});