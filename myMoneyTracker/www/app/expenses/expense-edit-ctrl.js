(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('expenseEditCtrl', ['$stateParams', '$window', '$interval','expenseApi', 'categoryApi', expenseEditCtrl]);

	function expenseEditCtrl($stateParams, $window, $interval, expenseApi, categoryApi) {
		var vm = this;

		vm.categories = [];
		categoryApi.getCategories(function (data) {
			vm.categories = data;
		})
		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }, 1000)
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
