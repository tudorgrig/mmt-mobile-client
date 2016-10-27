(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('incomeEditCtrl', ['$stateParams', 'incomeApi', incomeEditCtrl]);

	function incomeEditCtrl($stateParams, incomeApi) {
		var vm = this;

		vm.income = {
			id : $stateParams['id'],
			name : $stateParams['name'],
			description : $stateParams['description'],
			amount : parseFloat($stateParams['amount']),
			creationDate : new Date(parseInt($stateParams['creationDate'])),
			currency : $stateParams['currency'],
			frequency : parseInt($stateParams['frequency'])
		};

		vm.updateIncome = function () {
			incomeApi.updateIncome(vm.income, $stateParams['index']);
		}
	};

})();
