(function(){
	'use strict';

	angular.module('theAccountant').controller('addIncomeCtrl', ['$interval', '$window', 'incomeApi', addIncomeCtrl]);

	function addIncomeCtrl($interval, $window, incomeApi){
		var vm = this;
		vm.defaultCurrency = $window.localStorage['defaultCurrency'];

		vm.disableNoInternet;
    		if($window.localStorage['hasInternet'] != undefined) {
    		  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    		}
    		$interval(function(){
               if($window.localStorage['hasInternet'] != undefined) {
                      vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
               }
            }, 1000)

    vm.defaultCreationDate = new Date();
    vm.addIncome = function(income, changePath){
			incomeApi.addIncome(income, changePath);
		}
	};
})();
