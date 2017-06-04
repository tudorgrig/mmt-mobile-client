(function () {
	'use strict';

	angular.module('theAccountant').controller('counterpartyEditCtrl', ['$stateParams', '$window', '$interval', 'counterpartiesApi', counterpartyEditCtrl]);

	function counterpartyEditCtrl($stateParams, $window, $interval, counterpartiesApi) {
		var vm = this;
		vm.disableNoInternet;
		vm.counterparty = {
          			id : $stateParams['id'],
          			name : $stateParams['name'],
          			email : $stateParams['email']
    };
    if($window.localStorage['hasInternet'] != undefined) {
        vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
       if($window.localStorage['hasInternet'] != undefined) {
         vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
       }
    }, 1000)
		vm.update = function () {
			counterpartiesApi.updateCounterparty(vm.counterparty, $stateParams['index']);
		}
	};

})();
