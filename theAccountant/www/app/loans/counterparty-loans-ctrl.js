(function () {
	'use strict';

	angular.module('theAccountant').controller('counterpartyLoansCtrl', ['$ionicPopup', '$stateParams', '$window', '$interval', 'loanApi' , '$state', '$rootScope', '$timeout', counterpartyLoansCtrl]);

	function counterpartyLoansCtrl($ionicPopup, $stateParams, $window, $interval, loanApi, $state, $rootScope, $timeout) {
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
    };
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
    };
    vm.resolveActiveStatus = function(loan) {
      if(loan.active == true){
        return "Deactivate";
      }
      return "Activate";
    };

    vm.changeActiveStatus = function(loan){
      loan.active = !loan.active;
      loanApi.update(loan);
    };

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
    };

    /**
     * Initialize controller data
     */
    vm.initController = function() {
      if ($rootScope.licencePaymentApproved == null) {
        $timeout(vm.initController, 500);
      } else if ($rootScope.licencePaymentApproved === false) {
        var myPopup = $ionicPopup.show({
          title : '<i class="ion-locked"></i> Locked',
          subTitle : 'Loans, Notifications and Category limit are only available for contributors. In order to be able to use this functions you can ' +
          'contribute to the application accessing PAYMENT page. Thank you!',
          buttons : [
            {
              text : '<i class="ion-locked"></i> Unlock loans',
              type : 'button-small button-positive',
              onTap : function (e) {
                $state.go('app.payment');
              }
            },{
              text : '<i class="ion-home"></i> Home page',
              type : 'button-small button-positive',
              onTap : function (e) {
                $state.go('app.expenses');
              }
            }
          ]
        });
      } else {
        vm.getLoansByCounterparty();
      }
    };
    vm.initController();

    vm.resolveIconColour = function(loan){
      var loanAmount = (loan.receiving ? +1 : -1) * loan.amount;
      if(loanAmount < 0){
        return "balanced";
      }
      return "assertive";
    };

    vm.addLoan = function() {
      $state.go('app.add-loan', {
        counterpartyId : vm.counterparty.id,
        counterpartyName : vm.counterparty.name
      });
    };

    vm.updateLoan = function(loan, index) {
      $state.go('app.update-loan', {
        id : loan.id
      });
    };

	};

})();
