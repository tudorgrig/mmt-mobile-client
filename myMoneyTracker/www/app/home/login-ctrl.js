/* global username */
(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('loginCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$rootScope', '$window', loginCtrl]);

	function loginCtrl($stateParams, $ionicPopup, $http, $location, $rootScope, $window){
		var vm = this;
        
        
         vm.authenticate = function(user, callback) {

				var headers = user ? {
					authorization : "Basic "
							+ btoa(user.username + ":"
									+ user.password)
				} : {};

				$http.get('https://192.168.1.144:8443/user/login', {
					headers : headers
				}).success(function(data, status, headers) {
					if (data.username) {
                        console.log("Sunt logat cu " + data.username);
						$rootScope.authenticated = true;
						$window.localStorage['username'] = data.username;
						$window.localStorage['mmtlt'] = "Basic " + btoa(user.username + ":" + user.password);
                        console.log("Sunt logat cu " + $window.localStorage['username'] );
                        console.log("Sunt logat cu " + $window.localStorage['mmtlt']);
					} else {
						$rootScope.authenticated = false;
						$window.localStorage.remove('mmtlt');
					}
					callback && callback($rootScope.authenticated);
				}).error(function(data, status, headers) {
					$rootScope.authenticated = false;
                    var alertPopup = $ionicPopup.alert({
     							    title: 'Login error',
     							    template: data
   				     });
					callback && callback(false);
				});

		}

		
		vm.signIn = function(user){
            vm.authenticate(user, function(authenticated) {
					if (authenticated) {
						$location.path("/app/expenses");
						$rootScope.authenticated = true;
					} else {
						
						$location.path("/login");
						$rootScope.authenticated = false;
					}
				})

		}
	};
})();