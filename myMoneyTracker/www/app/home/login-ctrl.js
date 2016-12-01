/* global username */
(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('loginCtrl', ['$q', '$localStorage','$stateParams', '$ionicPopup', '$http', '$location', '$rootScope', '$window', '$scope', 'host_name', loginCtrl]);

	function loginCtrl($q, $localStorage, $stateParams, $ionicPopup, $http, $location, $rootScope, $window, $scope, host_name) {
		var vm = this;
		$scope.data = {};
		vm.user = {
		  username : $localStorage.loggedUsername,
		  password : $localStorage.password
		};
    console.log($localStorage);
    vm.rememberUserDetails = true;
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
					$window.localStorage['email'] = data.email;
					$window.localStorage['user'] = data;
					$window.localStorage['mmtlt'] = "Basic " + btoa(user.username + ":" + user.password);
					$window.localStorage['defaultCurrency'] = data.defaultCurrency;
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
          if(vm.rememberUserDetails){
            $localStorage.loggedUsername = user.username;
            $localStorage.password = user.password;
            console.log($localStorage);
          } else {
            $localStorage.loggedUsername = null;
            $localStorage.password = null;
          }
					$rootScope.authenticated = true;
					$location.path("/app/expenses");
				} else {
					$rootScope.authenticated = false;
					$location.path("/login");
				}
			})

		}

		vm.forgotPassword = function(){
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="email" ng-model="data.email">',
          title: 'Enter the email address used to register in application:',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-dark',
              onTap: function(e) {
                vm.sendForgotPasswordEmail($scope.data.email);
              }
            }
          ]
        });
		}

		vm.sendForgotPasswordEmail = function(email) {
        if(typeof email != "undefined"){
          var req = {
          				method : 'POST',
          				url : host_name + '/user/forgot_password',
          				headers : {
          					'Content-Type' : "application/json",
          					'Authorization' : $window.localStorage['mmtlt']
          				},
          				data : JSON.stringify(email)
          			}
          			// make server request
          			$http(req).then(
          				function (response) {
          				// SUCCESS: change the path
                    var alertPopup = $ionicPopup.alert({
                       title : "An e-mail has been sent with further instructions on resetting your password",
                    });
          			},
          				function (response) {
          				var alertPopup = $ionicPopup.alert({
          						title : "Error sending forgot password email",
          						template : response.message
          					});
          				if (response.status === 401) {
          					$location.url('/login');
          				}
          				return $q.reject(response);
          			});
        } else {
          var alertPopup = $ionicPopup.alert({
                         title: 'Wrong format',
                         template: 'Please enter a valid e-mail address'
                    });
        }
		}


	};
})();
