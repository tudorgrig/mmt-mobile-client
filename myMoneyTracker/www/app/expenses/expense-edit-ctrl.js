(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('expenseEditCtrl', ['$stateParams', 'expenseApi', 'categoryApi', expenseEditCtrl]);

	function expenseEditCtrl($stateParams, expenseApi, categoryApi) {
		var vm = this;

		vm.categories = [];
		categoryApi.getCategories(function (data) {
			vm.categories = data;
		})
		vm.expense = {
			id : $stateParams['id'],
			name : $stateParams['name'],
			description : $stateParams['description'],
			category : $stateParams['category'],
			amount : parseFloat($stateParams['amount']),
			creationDate : new Date(parseInt($stateParams['creationDate'])),
			currency : $stateParams['currency'],
			frequency : parseInt($stateParams['frequency'])

		};

		vm.updateExpense = function () {
			expenseApi.updateExpense(vm.expense, $stateParams['index']);
		}
	};

})();
