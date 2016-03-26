(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('categoryCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', categoryCtrl]);

    function confirmDelete(category){
        console.log(category);
    }

	function categoryCtrl($stateParams, $ionicPopup, $http, $location, $window){
		var vm = this;
		

        
        $http.get("https://192.168.1.144:8443/category/find_all", {
            headers : {
                'Authorization' : $window.localStorage['mmtlt']
            }
        }).success(function(data){
            vm.categories = data;
        });
        
        
        vm.selectCategory = function(category){
            console.log(category.name);
        }
	};
})();