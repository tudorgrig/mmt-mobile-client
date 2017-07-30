(function () {
	'use strict';

	angular.module('theAccountant').controller('counterpartyLoansCtrl', ['$ionicPopup', '$stateParams', '$window', '$interval', 'loanApi', counterpartyLoansCtrl]);

	function counterpartyLoansCtrl($ionicPopup, $stateParams, $window, $interval, loanApi) {
		var vm = this;
		vm.disableNoInternet;
		vm.loans = [];
		vm.counterparty = {
          			id : $stateParams['id'],
          			name : $stateParams['name'],
          			email : $stateParams['email']
    };
    if($window.localStorage['hasInternet'] != undefined) {
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    vm.getLoansByCounterparty = function(){
        loanApi.getLoansByCounterparty($stateParams['id'], function (data) {
          vm.loans = data;
        })
    }
    $interval(function(){
       if($window.localStorage['hasInternet'] != undefined) {
         vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
       }
    }, 1000)

    vm.resolveDirectionOfLoan = function(loan){
      if(loan.receiving == false){
        return "received";
      }
      return "lent";
    }
    vm.resolveActiveStatus = function(loan) {
      if(loan.active == true){
        return "Deactivate";
      }
      return "Activate";
    }

    vm.changeActiveStatus = function(loan){
      loan.active = !loan.active;
      loanApi.update(loan);
    }

    vm.confirmDelete = function (loan) {
    			var myPopup = $ionicPopup.show({
    					title : 'Confirm delete',
    					subTitle : 'Are you sure you want to delete this loan?',
    					buttons : [{
    							text : 'Cancel',
    							type : 'button-dark'
    						}, {
    							text : '<b>Delete</b>',
    							type : 'button-assertive',
    							onTap : function (e) {
    								loanApi.deleteLoan(loan);
    							}
    						}
    					]
    			});
    }

    vm.getLoansByCounterparty();

	};

})();
