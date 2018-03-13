(function(){
	'use strict';

	angular.module('theAccountant').controller('menuLayout', ['$window', '$rootScope', menuLayout]);

	function menuLayout($window, $rootScope){
		var vm = this;
		vm.loggedUser = $window.localStorage['username'];
	};
})();
