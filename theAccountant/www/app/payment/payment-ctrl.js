(function(){
	'use strict';

	angular.module('theAccountant').controller('paymentCtrl', ['$window', '$rootScope', paymentCtrl]);

	function paymentCtrl($window, $rootScope){
		var vm = this;
		vm.loggedUser = $window.localStorage['username'];

		vm.payment = function() {
      $window.location.href = "https://www.theacctnt.com/#/payment";
    }
	};
})();
