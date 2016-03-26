(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('incomeCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', incomeCtrl]);

	function incomeCtrl($stateParams, $ionicPopup, $http, $location){
		var vm = this;
		
		vm.addIncome = function(income){
			var req = {
         			method: 'POST',
         			url: 'http://192.168.1.144:8080/income/add',
         			headers: {
           					'Content-Type': "application/json"
        			},
         			data: JSON.stringify(income)
      		}
      		// make server request
      		$http(req).then(
        			function(){
          				// SUCCESS: change the path
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Income created'
   						});
          				$location.path('/app/incomes');
        			},
        			function(response){
                  console.log("response",response);
          			 var alertPopup = $ionicPopup.alert({
     							    title: 'Error when creating income'
     							    // template: response.data
   						   });
       				}
       		);

		}
	};
})();