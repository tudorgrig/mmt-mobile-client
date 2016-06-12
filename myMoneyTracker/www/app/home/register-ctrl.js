(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('registerCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', registerCtrl]);

	function registerCtrl($stateParams, $ionicPopup, $http, $location){
		var vm = this;
		
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
         			url: 'https://192.168.1.144:8443/user/add',
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