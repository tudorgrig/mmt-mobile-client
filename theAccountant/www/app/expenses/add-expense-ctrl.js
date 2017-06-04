(function () {
	'use strict';

	angular.module('theAccountant').controller('addExpenseCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', 'expenseApi', addExpenseCtrl]);

	function addExpenseCtrl($stateParams, $interval, $ionicPopup, $http, $location, $window, categoryApi, expenseApi) {
		var vm = this;
		vm.categories = [];
		vm.defaultCurrency = $window.localStorage['defaultCurrency'];
		vm.defaultCreationDate = new Date();
		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
       vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
       if($window.localStorage['hasInternet'] != undefined) {
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
       }
    }, 1000)
		categoryApi.getCategories(function (data) {
			vm.categories = data;
		})
		vm.addExpense = function (expense, changePath) {
			expenseApi.addExpense(expense, changePath);
		}
	};
})();
