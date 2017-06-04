(function () {
	'use strict';

	angular.module('theAccountant').controller('addLoanCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', 'counterpartiesApi', 'loanApi', addLoanCtrl]);

	function addLoanCtrl($stateParams, $interval, $ionicPopup, $http, $location, $window, counterpartiesApi, loanApi) {
		var vm = this;

		vm.defaultCurrency = $window.localStorage['defaultCurrency'];
    vm.defaultCreationDate = new Date();
    vm.defaultUntilDate = new Date(vm.defaultCreationDate + 1);
    vm.counterparties = [];
    vm.addNewPerson = false;
    vm.findAllCounterparties = function () {
       counterpartiesApi.getAllCounterparties(function (data) {
        	  vm.counterparties = data;
       })
    }
		vm.addLoan = function(loan, changePath){
		  loan.active = true;
		  if(vm.addNewPerson == true){
		    loan.counterparty = {};
		    loan.counterparty.name = loan.counterpartyNew.name;
		    loan.counterparty.email = loan.counterpartyNew.email;
		  }else{
		    loan.counterparty = loan.counterpartySelect;
		  }
		  if(loan.receiving != true){
		    loan.receiving = false;
		  }
		  if(loan.counterparty == null){
		    var myPopup = $ionicPopup.show({
        		title : 'Input error',
        		subTitle : 'Please provide valid counterparty data!',
        		buttons : [{
            	text : 'Ok',
            	type : 'button-dark'
            }]
        });
        return;
		  }
		  else{
		    loanApi.addLoan(loan, changePath);
		  }
		}
		vm.findAllCounterparties();
	};
})();
