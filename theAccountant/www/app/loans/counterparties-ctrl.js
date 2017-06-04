(function () {
	'use strict';

	angular.module('theAccountant').controller('counterpartiesCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window', 'counterpartiesApi', counterpartiesCtrl]);

	function counterpartiesCtrl($stateParams, $ionicPopup, $http, $state, $window, counterpartiesApi) {
		var vm = this;

    vm.counterparties = [];
    vm.defaultCurrency = $window.localStorage['defaultCurrency'];

    vm.findAllCounterparties = function () {
    	 counterpartiesApi.getAllCounterparties(function (data) {
    			vm.counterparties = data;
    	 })
    }

    vm.resolveTotalValue = function(counterparty){
      if(counterparty.total > 0){
        return "You lent ";
      }
      else {
        return "You owe ";
      }
    }

    vm.resolveColour = function(counterparty){
      console.log(counterparty);
      if(counterparty.total < 0){
        return "red";
      }
      return "green";
    }

    vm.update = function (counterparty, index) {
    	$state.go('app.counterparty-edit', {
    		id : counterparty.id,
    		name : counterparty.name,
    		email : counterparty.email,
    		index : index
    	});
    }

    vm.confirmDelete = function (counterparty, index) {
    			var myPopup = $ionicPopup.show({
    					title : 'Confirm delete',
    					subTitle : 'Are you sure you want to delete this counterparty?',
    					buttons : [{
    							text : 'Cancel',
    							type : 'button-dark'
    						}, {
    							text : '<b>Delete</b>',
    							type : 'button-assertive',
    							onTap : function (e) {
    								counterpartiesApi.deleteCounterparty(counterparty, function (data) {
    									vm.counterparties.splice(vm.counterparties.indexOf(counterparty), 1);
    								});
    							}
    						}
    					]
    				});
    }

    vm.findAllCounterparties();
	};
})();
