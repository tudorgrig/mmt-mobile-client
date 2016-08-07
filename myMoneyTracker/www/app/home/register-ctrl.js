(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('registerCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', 'host_name', registerCtrl]);

	function registerCtrl($stateParams, $ionicPopup, $http, $location, host_name){
		var vm = this;
		
        vm.currencies = ["EUR", "USD", "GBP", "RON","JPY", "CNY", "SDG", "MKD", "MXN", "CAD",
    "ZAR", "AUD", "NOK", "ILS", "ISK", "SYP", "LYD", "UYU", "YER", "CSD",
    "EEK", "THB", "IDR", "LBP", "AED", "BOB", "QAR", "BHD", "HNL", "HRK",
    "COP", "ALL", "DKK", "MYR", "SEK", "RSD", "BGN", "DOP", "KRW", "LVL",
    "VEF", "CZK", "TND", "KWD", "VND", "JOD", "NZD", "PAB", "CLP", "PEN",
    "DZD", "CHF", "RUB", "UAH", "ARS", "SAR", "EGP", "INR", "PYG",
    "TWD", "TRY", "BAM", "OMR", "SGD", "MAD", "BYR", "NIO", "HKD", "LTL",
    "SKK", "GTQ", "BRL", "HUF", "IQD", "CRC", "PHP", "SVC", "PLN"];
    
        vm.user = [];
        vm.user.currency = vm.currencies[0];
        
		vm.register = function(user){
			if(user.password != user.password2){
				var alertPopup = $ionicPopup.alert({
     					title: 'Incorrect password',
     					template: 'Please retype the same password!'
   				});
   				return;
			}

			var req = {
         			method: 'POST',
         			url: host_name + '/user/add',
         			headers: {
           					'Content-Type': "application/json"
        			},
         			data: JSON.stringify(user)
      		}
      		// make server request
      		$http(req).then(
        			function(){
          				// SUCCESS: change the path
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'The account has been created. Please verify your account by accessing your email'
   						});
          				$location.path('/home/login');
        			},
        			function(response){
                        console.log(response);
          			    var alertPopup = $ionicPopup.alert({
     							    title: 'Registration error',
     							    template: response.data.message
   						   });
       				}
       		);

		}
	};
})();