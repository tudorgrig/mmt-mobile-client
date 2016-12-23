(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('expenseCtrl', ['$ionicFilterBar', '$scope','$stateParams', '$ionicPopup', '$http', '$state', '$window', '$ionicActionSheet', '$ionicListDelegate', 'expenseApi', 'categoryApi', expenseCtrl]);

	function expenseCtrl($ionicFilterBar, $scope, $stateParams, $ionicPopup, $http, $state, $window, $ionicActionSheet, $ionicListDelegate, expenseApi, categoryApi) {
		var vm = this,
		         filterBarInstance;

		//expense data
		vm.expenses = [];
		var date = new Date();
		vm.expenseChartFromDate = new Date(date.getFullYear(), date.getMonth(), 1);
		vm.expenseChartUntilDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		vm.dynamicOrder = "-creationDate";
		vm.allCategories = "All categories";
		vm.filter_category = undefined;
		vm.categories = [];
		categoryApi.getCategories(function (data) {

    			vm.extractCategoryNames(data, vm.categories);
    })

    vm.showFilterBar = function () {
          filterBarInstance = $ionicFilterBar.show({
            items: vm.expenses,
            update: function (filteredItems) {
              vm.expenses = filteredItems;
            },
            filterProperties: ['name']
          });
    };

    vm.extractCategoryNames = function(categoriesArray, categoryNames) {
        var i;
        categoryNames.push(vm.allCategories);
        for (i = 0; i < categoriesArray.length; i++) {
          categoryNames.push(categoriesArray[i].name);
        }
    }

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
							type : 'button-dark'
						}, {
							text : '<b>Delete</b>',
							type : 'button-assertive',
							onTap : function (e) {
								expenseApi.deleteExpense(expense, function (data) {
									vm.expenses.splice(vm.expenses.indexOf(expense), 1);
								});
							}
						}
					]
				});
		}

		vm.filterByCategory = function(){
		  if(vm.selected_category == vm.allCategories){
		    vm.filter_category = undefined;
		  }
		  else {
		    vm.filter_category = vm.selected_category;
		  }
		}

		$scope.toggleItem= function(expense) {
        if ($scope.isItemShown(expense)) {
          $scope.shownItem = null;
        } else {
          $scope.shownItem = expense;
        }
    };
    $scope.isItemShown = function(expense) {
        return $scope.shownItem === expense;
    };

		vm.reorderBy = function(criteria){
		  vm.dynamicOrder = criteria;
		}

		vm.updateExpenses();
	}
})();
