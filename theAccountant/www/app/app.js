angular.module('theAccountant', ['ionic', 'ionic.cloud', 'ngCordova', 'ngStorage', 'chart.js', 'ion-floating-menu', 'jett.ionic.filter.bar'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
          "app_id": "56475f2d"
    },
    "push": {
          "sender_id": "383898634095",
          "pluginConfig": {
            "ios": {
              "badge": true,
              "sound": true
            },
            "android": {
              "iconColor": "#343434"
            }
          }
    }
  });
})

.run(function($ionicPlatform, $interval, $window, $ionicPopup, notificationApi, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var checked = false;
    function checkConnection() {
    	    var networkState = navigator.network.connection.type;
    	    if(networkState == Connection.NONE){
    	          if(!checked){
    	            checked = true;
    	            $window.localStorage['hasInternet'] = false;
                  var alertPopup = $ionicPopup.alert({
                    title : 'No Internet connection!',
                    template : 'Please activate your Internet connection',
                    buttons: [
                      {
                          text: '<b>Ok</b>',
                          type: 'button-dark'
                      }
                    ]
                  });
    	          }
    	    }
    	}
    	$interval(function(){
    		checkConnection();
    	}, 3000)


    	document.addEventListener("offline", onOffline, false);
    	document.addEventListener("online", onOnline, false);

    	function onOffline() {
    	   // Handle the offline event

    	   $window.localStorage['hasInternet'] = false;
    	   if(!checked){
    	    checked = true;
    	    var alertPopup = $ionicPopup.alert({
         		title : 'No Internet connection!',
         		template : 'Please activate your Internet connection',
         		buttons: [
              {
                text: '<b>Ok</b>',
                type: 'button-dark'
              }
            ]
          });
         }
    	}

    	function onOnline() {

    	   $window.localStorage['hasInternet'] = true;
    	   checked = false;
    	}

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    notificationApi.getTotalNotifications(function (data) {
      $rootScope.totalNotifications = 0;
      if (data && data.total) {
        $rootScope.totalNotifications = data.total;
      } else {
        console.warn(" No notification found: data = " + JSON.stringify(data));
      }
    });
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

		.state('app.change-password', {
    			url:"/change-password",
    			cache: false,
    			views: {
    				"mainContent" : {
    					templateUrl : "app/account/change-password.html"
    				}
    			}
    })

		.state('app.help', {
    			url:"/help",
    			cache: true,
    			views: {
    				"mainContent" : {
    					templateUrl : "app/help/help.html"
    				}
    			}
    })

    .state('app.help-create-expense', {
        			url:"/helpCreateNewExpense",
        			cache: true,
        			views: {
        				"mainContent" : {
        					templateUrl : "app/help/create-expense.html"
        				}
        			}
    })

    .state('app.help-update-expense', {
          url:"/helpUpdateExpense",
          cache: true,
          views: {
            "mainContent" : {
              templateUrl : "app/help/update-expense.html"
            }
          }
    })

    .state('app.help-delete-expense', {
              url:"/helpDeleteExpense",
              cache: true,
              views: {
                "mainContent" : {
                  templateUrl : "app/help/delete-expense.html"
                }
              }
    })

    .state('app.help-create-income', {
            			url:"/helpCreateNewIncome",
            			cache: true,
            			views: {
            				"mainContent" : {
            					templateUrl : "app/help/create-income.html"
            				}
            			}
    })

    .state('app.help-update-income', {
              url:"/helpUpdateIncome",
              cache: true,
              views: {
                "mainContent" : {
                  templateUrl : "app/help/update-income.html"
                }
              }
    })

    .state('app.help-delete-income', {
                  url:"/helpDeleteIncome",
                  cache: true,
                  views: {
                    "mainContent" : {
                      templateUrl : "app/help/delete-income.html"
                    }
                  }
    })

    .state('app.contactus', {
        			url:"/contactus",
        			cache: false,
        			views: {
        				"mainContent" : {
        					templateUrl : "app/contactus/contactus.html"
        				}
        			}
    })

    .state('app.notifications', {
    			url:"/notifications",
    			cache: false,
    			views: {
    				"mainContent" : {
    					templateUrl : "app/notifications/notifications.html"
    				}
    			}
    })

    .state('app.counterparties', {
        			url:"/counterparties",
        			cache: false,
        			views: {
        				"mainContent" : {
        					templateUrl : "app/loans/counterparties.html"
        				}
        			}
    })

    .state('app.counterparty-loans', {
              url:"/counterparty-loans/:id/:name/:email/:index",
              cache: false,
              views: {
                "mainContent" : {
                  templateUrl : "app/loans/counterparty-loans.html"
                }
              }
    })

    .state('app.counterparty-edit', {
          url:"/counterparty-edit/:id/:name/:email/:index",
          cache: false,
          views: {
            "mainContent" : {
              templateUrl : "app/loans/counterparty-edit.html"
            }
          }
    })

    .state('app.add-loan', {
    			url:"/add-loan/:counterpartyId/:counterpartyName",
    			cache: false,
    			views: {
    				"mainContent" : {
    					templateUrl : "app/loans/add-loan.html"
    				}
    			}
    })

    .state('app.update-loan', {
      url:"/update-loan/:id",
      cache: false,
      views: {
        "mainContent" : {
          templateUrl : "app/loans/add-loan.html"
        }
      }
    })

	$urlRouterProvider.otherwise('/home/login');
	$ionicConfigProvider.tabs.position('bottom');
})

.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    $state.go('tabs.home');
  };

});
