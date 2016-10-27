(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('addExpenseCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', 'expenseApi', addExpenseCtrl]);

	function addExpenseCtrl($stateParams, $ionicPopup, $http, $location, $window, categoryApi, expenseApi) {
		var vm = this;
		vm.categories = [];
		categoryApi.getCategories(function (data) {
			vm.categories = data;
		})
		vm.addExpense = function (expense, changePath) {
			expenseApi.addExpense(expense, changePath);
		}
	};
})();