(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('incomeCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window', '$ionicActionSheet', '$ionicListDelegate', 'incomeApi',incomeCtrl]);

	function incomeCtrl($stateParams, $ionicPopup, $http, $state, $window,$ionicActionSheet, $ionicListDelegate, incomeApi){
		var vm = this;
        vm.incomes = [];
        incomeApi.getIncomes(function(data){
            vm.incomes = data;
        })
        vm.selectIncome = function(income){
            console.log(income.name);
        }
        
        vm.updateIncome = function(income, index){
           console.log(income);
           $state.go('app.income-edit', { 
               id: income.id, 
               name: income.name,
               description: income.description,
               amount: income.amount,
               creationDate: income.creationDate,
               currency: income.currency,
               frequency: income.frequency,
               index: index});
       }
        
        vm.confirmDelete = function(income, index){
            var myPopup = $ionicPopup.show({
                    title: 'Confirm delete',
                    subTitle: 'Are you sure you want to delete this income?',
                    buttons: [
                            { 
                                text: 'Cancel',
                                type: 'button-positive'
                            },
                            {
                                text: '<b>Delete</b>',
                                type: 'button-assertive',
                                onTap: function(e) {
                                    incomeApi.deleteIncome(income, function(data){
                                        vm.incomes.splice(index, 1);
                                    });
                                }
                            }
                    ]
            });
       }
    }
})();