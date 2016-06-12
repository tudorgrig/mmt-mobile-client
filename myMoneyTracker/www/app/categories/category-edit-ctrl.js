(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('categoryEditCtrl', ['$stateParams', 'categoryApi', categoryEditCtrl]);

    function categoryEditCtrl($stateParams, categoryApi){
		var vm = this;
        vm.category = {id:  $stateParams['id'], name:  $stateParams['name'], colour:  $stateParams['colour'], threshold: parseFloat($stateParams['threshold'])};
        
        vm.updateCategory = function(){
            categoryApi.updateCategory(vm.category, $stateParams['index']);
        }
	};

})();