(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('addIncomeCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', 'incomeApi', addIncomeCtrl]);

	function addIncomeCtrl($stateParams, $ionicPopup, $http, $location, $window, incomeApi){
		var vm = this;
        vm.incomes = [];
        incomeApi.getIncomes(function(data){
            console.log(data);
            vm.incomes = data;
        })
        
        vm.addIncome = function(income, changePath){
            console.log(income);
			incomeApi.addIncome(income, changePath);
		}
	};
})();