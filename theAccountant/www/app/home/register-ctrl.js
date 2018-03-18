(function () {
	'use strict';

	angular.module('theAccountant').controller('registerCtrl', ['$interval', '$window', '$ionicPopup', '$http', '$location', 'host_name', registerCtrl]);

	function registerCtrl($interval, $window, $ionicPopup, $http, $location, host_name) {
		var vm = this;

		vm.currencies = ["EUR", "USD", "GBP", "RON", "JPY", "BGN", "CZK", "DKK", "HUF", "PLN", "SEK", "CHF", "NOK",
          "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN",
          "MYR", "NZD", "PHP", "SGD", "THB", "ZAR"];

    vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
    		 vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)

		vm.user = [];
		vm.user.currency = vm.currencies[0];

		vm.register = function (user) {
			if (user.password != user.password2) {
				var alertPopup = $ionicPopup.alert({
						title : 'Incorrect password',
						template : 'Please retype the same password!'
					});
				return;
			}
			if(user.password.length < 8){
			  var alertPopup = $ionicPopup.alert({
        						title : 'Incorrect password',
        						template : 'Please use at least 8 characters for password!'
        					});
        return;
			}
			if(user.username.length < 5){
      			  var alertPopup = $ionicPopup.alert({
              						title : 'Incorrect username',
              						template : 'Please use at least 5 characters for username!'
              					});
              return;
      }

			var req = {
				method : 'POST',
				url : host_name + '/user/add',
				headers : {
					'Content-Type' : "application/json"
				},
				data : JSON.stringify(user)
			}
			// make server request
			$http(req).then(
				function () {
				// SUCCESS: change the path
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'The account has been created. Please verify your account by accessing your email'
					});
				$location.path('/home/login');
			},
				function (response) {
				console.log(response);
				var alertPopup = $ionicPopup.alert({
						title : 'Registration error',
						template : response.data.message
					});
			});

		}
	};
})();
