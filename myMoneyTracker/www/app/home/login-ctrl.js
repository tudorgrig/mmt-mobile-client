/* global username */
(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('loginCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$rootScope', '$window', 'host_name', loginCtrl]);

	function loginCtrl($stateParams, $ionicPopup, $http, $location, $rootScope, $window, host_name) {
		var vm = this;

		vm.authenticate = function (user, callback) {

			var headers = user ? {
				authorization : "Basic "
				 + btoa(user.username + ":"
					 + user.password)
			}
			 : {};

			$http.get(host_name + '/user/login', {
				headers : headers
			}).success(function (data, status, headers) {
				if (data.username) {
					$rootScope.authenticated = true;
					$window.localStorage['username'] = data.username;
					$window.localStorage['user'] = data;
					$window.localStorage['mmtlt'] = "Basic " + btoa(user.username + ":" + user.password);
					$window.localStorage['defaultCurrency'] = data.defaultCurrency;
					console.log("default currency", $window.localStorage['defaultCurrency']);
				} else {
					$rootScope.authenticated = false;
					$window.localStorage.remove('mmtlt');
				}
				callback && callback($rootScope.authenticated);
			}).error(function (data, status, headers) {
				$rootScope.authenticated = false;
				var alertPopup = $ionicPopup.alert({
						title : 'Login error',
						template : data.message
					});
				callback && callback(false);
			});

		}

		vm.signIn = function (user) {
			vm.authenticate(user, function (authenticated) {
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