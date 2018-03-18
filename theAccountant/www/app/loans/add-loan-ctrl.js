(function () {
	'use strict';

	angular.module('theAccountant').controller('addLoanCtrl', ['$stateParams', '$ionicPopup', '$window', 'counterpartiesApi', 'loanApi', addLoanCtrl]);

	function addLoanCtrl($stateParams, $ionicPopup, $window, counterpartiesApi, loanApi) {
		var vm = this;

		vm.defaultCurrency = $window.localStorage['defaultCurrency'];
    vm.defaultCreationDate = new Date();
    vm.defaultUntilDate = new Date(vm.defaultCreationDate + 1);
    vm.counterparties = [];
    vm.addNewPerson = false;
    vm.counterpartyId = $stateParams['counterpartyId'];
    vm.counterpartyName = $stateParams['counterpartyName'];
    vm.loanId = $stateParams['id'];

    vm.loan = {
      receiving: false
    };
    vm.isLoanUpdate = false;

    if (vm.loanId) {
      vm.isLoanUpdate = true;
      loanApi.getLoan(vm.loanId, function(loan) {
        vm.loan = loan;
        vm.loan.creationDate = new Date(loan.creationDate);
        vm.loan.untilDate = new Date(loan.untilDate);
        vm.loan.counterpartySelect = loan.counterparty;
      })

    } else if (vm.counterpartyId && vm.counterpartyName) {
      vm.loan.counterpartySelect = {
        id: vm.counterpartyId,
        name: vm.counterpartyName
      }
    }

    vm.findAllCounterparties = function () {
       counterpartiesApi.getAllCounterparties(function (data) {
        	  vm.counterparties = data;
       })
    };

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
		    if (vm.isLoanUpdate) {
          loanApi.update(loan, changePath);
        } else {
          loanApi.addLoan(loan, changePath);
        }
		  }
		};

		vm.findAllCounterparties();
	};
})();
