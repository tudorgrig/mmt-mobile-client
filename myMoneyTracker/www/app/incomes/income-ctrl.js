(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('incomeCtrl', ['$ionicFilterBar', '$scope', '$stateParams', '$location', '$ionicPopup', '$http', '$state', '$window', '$ionicActionSheet', '$ionicListDelegate', 'incomeApi', incomeCtrl]);

	function incomeCtrl($ionicFilterBar, $scope, $stateParams, $location, $ionicPopup, $http, $state, $window, $ionicActionSheet, $ionicListDelegate, incomeApi) {
		var vm = this, filterBarInstance;
		vm.incomes = [];
		var date = new Date();
		vm.incomesFromDate = new Date(date.getFullYear(), 0, 1);
		vm.incomesUntilDate = new Date(date.getFullYear(), 11, 31);

    vm.showFilterBar = function () {
              filterBarInstance = $ionicFilterBar.show({
                items: vm.incomes,
                update: function (filteredItems) {
                  vm.incomes = filteredItems;
                },
                filterProperties: ['name']
              });
    };

		vm.updateIncomes = function (yearChanged) {
			incomeApi.getIncomesByInterval(vm.incomesFromDate.getTime(), vm.incomesUntilDate.getTime(), function (data) {
				vm.incomes = [];
        vm.incomes = data;
			})
		}

		vm.updateIncome = function (income, index) {
			$state.go('app.income-edit', {
				id : income.id,
				name : income.name,
				description : income.description,
				amount : income.amount,
				creationDate : income.creationDate,
				currency : income.currency,
				frequency : income.frequency,
				index : index
			});
		}

		vm.confirmDelete = function (income, index) {
		  console.log(index);
			var myPopup = $ionicPopup.show({
					title : 'Confirm delete',
					subTitle : 'Are you sure you want to delete this income?',
					buttons : [{
							text : 'Cancel',
							type : 'button-dark'
						}, {
							text : '<b>Delete</b>',
							type : 'button-assertive',
							onTap : function (e) {
								incomeApi.deleteIncome(income, function (data) {
									vm.incomes.splice(index, 1);
								});
							}
						}
					]
				});
		}

		$scope.toggleItem= function(income) {
       if ($scope.isItemShown(income)) {
           $scope.shownItem = null;
       } else {
           $scope.shownItem = income;
       }
    };
    $scope.isItemShown = function(income) {
       return $scope.shownItem === income;
    };

		vm.updateIncomes();
	}
})();
