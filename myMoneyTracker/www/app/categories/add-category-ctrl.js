(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('addCategoryCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', addCategoryCtrl]);

	function addCategoryCtrl($stateParams, $interval, $ionicPopup, $http, $location, $window, categoryApi) {
		var vm = this;

    vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
       vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
       vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }, 1000)

		vm.addCategory = function (category, changePath) {
			categoryApi.addCategory(category, changePath);
		}
	};
})();
