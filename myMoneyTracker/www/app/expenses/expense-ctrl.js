(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('expenseCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window', '$ionicActionSheet', '$ionicListDelegate', 'expenseApi', expenseCtrl]);

	function expenseCtrl($stateParams, $ionicPopup, $http, $state, $window, $ionicActionSheet, $ionicListDelegate, expenseApi) {
		var vm = this;
		//expense data
		vm.expenses = [];
		var date = new Date();
		vm.expenseChartFromDate = new Date(date.getFullYear(), date.getMonth(), 1);
		vm.expenseChartUntilDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		vm.updateExpenses = function () {
			expenseApi.getByInterval(vm.expenseChartFromDate.getTime(), vm.expenseChartUntilDate.getTime(), function (data) {
				vm.expenses = [];
				vm.expenses = data;
			})
		}

		vm.updateExpense = function (expense, index) {
			$state.go('app.expense-edit', {
				id : expense.id,
				name : expense.name,
				category : expense.category,
				description : expense.description,
				amount : expense.amount,
				creationDate : expense.creationDate,
				currency : expense.currency,
				frequency : expense.frequency,
				index : index
			});
		}

		vm.confirmDelete = function (expense, index) {
			var myPopup = $ionicPopup.show({
					title : 'Confirm delete',
					subTitle : 'Are you sure you want to delete this expense?',
					buttons : [{
							text : 'Cancel',
							type : 'button-positive'
						}, {
							text : '<b>Delete</b>',
							type : 'button-assertive',
							onTap : function (e) {
								expenseApi.deleteExpense(expense, function (data) {
									vm.expenses.splice(index, 1);
								});
							}
						}
					]
				});
		}

		vm.updateExpenses();
	}
})();
