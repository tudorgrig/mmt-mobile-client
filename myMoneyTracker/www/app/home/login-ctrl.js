(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('loginCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', loginCtrl]);

	function loginCtrl($stateParams, $ionicPopup, $http, $location){
		var vm = this;
		
		vm.signIn = function(user){
      console.log("$stateParams", $stateParams);
			var req = {
         			method: 'POST',
         			url: 'http://192.168.1.144:8080/user/login',
         			headers: {
           					'Content-Type': "application/json"
        			},
         			data: JSON.stringify(user)
      		}
      		// make server request
      		$http(req).then(
        			function(){
          				// SUCCESS: change the path
          				$location.path('/app/expenses');
        			},
        			function(response){
                console.log("response",response);
          			 var alertPopup = $ionicPopup.alert({
     							    title: 'Login error',
     							    template: response.data
   						   });
       				}
       		);

		}
	};
})();