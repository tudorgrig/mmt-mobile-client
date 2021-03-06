(function () {
	'use strict';

	angular.module('theAccountant').controller('incomeEditCtrl', ['$stateParams', '$window', '$interval', 'incomeApi', incomeEditCtrl]);

	function incomeEditCtrl($stateParams, $window, $interval, incomeApi) {
		var vm = this;

		vm.income = {
			id : $stateParams['id'],
			name : $stateParams['name'],
			description : $stateParams['description'],
			amount : parseFloat($stateParams['amount']),
			creationDate : new Date(parseInt($stateParams['creationDate'])),
			currency : $stateParams['currency'],
			frequency : $stateParams['frequency']
		};

		vm.updateIncome = function () {
			incomeApi.updateIncome(vm.income, $stateParams['index']);
		}

		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
      vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)
	};

})();
