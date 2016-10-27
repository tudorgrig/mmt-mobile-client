(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('addCategoryCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', addCategoryCtrl]);

	function addCategoryCtrl($stateParams, $ionicPopup, $http, $location, $window, categoryApi) {
		var vm = this;

		vm.addCategory = function (category, changePath) {
			categoryApi.addCategory(category, changePath);
		}
	};
})();
