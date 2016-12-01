angular.module('myMoneyTracker', ['ionic', 'ngStorage', 'chart.js'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
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
			}
		})

		.state('app', {
			abstract : true,
			url : "/app",
			templateUrl: "app/layout/menu-layout.html"
		})


		.state('app.expenses', {
			url:"/expenses",
			cache: false,
			views: {
				"mainContent" : {
					templateUrl : "app/expenses/expenses.html"
				}
			}
		})

		.state('app.add-expense', {
			url:"/add-expense",
			views: {
				"mainContent" : {
					templateUrl : "app/expenses/add-expense.html"
				}
			}
		})

        .state('app.expense-edit', {
			url:"/expenseEdit/:id/:name/:category/:description/:amount/:creationDate/:currency/:frequency/:index",
			views: {
				"mainContent" : {
					templateUrl : "app/expenses/expense-edit.html"
				}
			}
		})

		.state('app.incomes', {
			url:"/incomes",
			cache: false,
			views: {
				"mainContent" : {
					templateUrl : "app/incomes/incomes.html"
				}
			}
		})

		.state('app.add-income', {
			url:"/add-income",
			views: {
				"mainContent" : {
					templateUrl : "app/incomes/add-income.html"
				}
			}
		})

        .state('app.income-edit', {
			url:"/incomeEdit/:id/:name/:description/:amount/:creationDate/:currency/:frequency/:index",
			views: {
				"mainContent" : {
					templateUrl : "app/incomes/income-edit.html"
				}
			}
		})


		.state('app.categories', {
			url:"/categories",
			cache: false,
			views: {
				"mainContent" : {
					templateUrl : "app/categories/categories.html"
				}
			}
		})

		.state('app.add-category', {
			url:"/add-category",
			views: {
				"mainContent" : {
					templateUrl : "app/categories/add-category.html"
				}
			}
		})

        .state('app.category-edit', {
			url:"/categoryEdit/:id/:name/:colour/:threshold/:index",
			views: {
				"mainContent" : {
					templateUrl : "app/categories/category-edit.html"
				}
			}
		})

		.state('app.statistics', {
			url:"/statistics",
			cache: false,
			views: {
				"mainContent" : {
					templateUrl : "app/statistics/statistics.html"
				}
			}
		})

		.state('app.account', {
			url:"/account",
			cache: false,
			views: {
				"mainContent" : {
					templateUrl : "app/account/account.html"
				}
			}
		})

		.state('app.help', {
    			url:"/help",
    			cache: false,
    			views: {
    				"mainContent" : {
    					templateUrl : "app/help/help.html"
    				}
    			}
    });

	$urlRouterProvider.otherwise('/home/login');
	$ionicConfigProvider.tabs.position('bottom');
})

.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tabs.home');
  };

});
