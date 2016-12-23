(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('categoryEditCtrl', ['$stateParams', '$window', '$interval', 'categoryApi', categoryEditCtrl]);

	function categoryEditCtrl($stateParams, $window, $interval, categoryApi) {
		var vm = this;

		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
    		  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)

		vm.category = {
			id : $stateParams['id'],
			name : $stateParams['name'],
			colour : $stateParams['colour'],
			threshold : parseFloat($stateParams['threshold'])
		};

		vm.updateCategory = function () {
			categoryApi.updateCategory(vm.category, $stateParams['index']);
		}
	};

})();
