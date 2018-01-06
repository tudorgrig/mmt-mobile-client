(function(){
	'use strict';

	angular.module('theAccountant').controller('menuLayout', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', 'host_name', menuLayout]);

	function menuLayout($stateParams, $ionicPopup, $http, $location, $window, host_name){
		var vm = this;
		vm.loggedUser = $window.localStorage['username'];
	};
})();