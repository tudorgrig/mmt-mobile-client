(function () {
	'use strict';

	angular.module('theAccountant').controller('expenseEditCtrl', ['$stateParams', '$window', '$interval','expenseApi', 'categoryApi', expenseEditCtrl]);

	function expenseEditCtrl($stateParams, $window, $interval, expenseApi, categoryApi) {
		var vm = this;

		vm.categories = [];
		categoryApi.getCategories(function (data) {
			vm.categories = data;
			vm.categorySelected = JSON.parse($stateParams['category']);
			vm.expense = {
      			id : $stateParams['id'],
      			name : $stateParams['name'],
      			description : $stateParams['description'],
      			category : null,
      			amount : parseFloat($stateParams['amount']),
      			creationDate : new Date(parseInt($stateParams['creationDate'])),
      			currency : $stateParams['currency'],
      			frequency : $stateParams['frequency']
      		};
			var i;
			for (i = 0; i <vm.categories.length; i++) {
				if (vm.categorySelected.name === vm.categories[i].name) {
					vm.expense.category = vm.categories[i];
				}
			}
		})
		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)
		vm.updateExpense = function () {
			expenseApi.updateExpense(vm.expense, $stateParams['index']);
		}
	};

})();
