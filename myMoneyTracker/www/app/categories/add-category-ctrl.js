(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('addCategoryCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', addCategoryCtrl]);

	function addCategoryCtrl($stateParams, $ionicPopup, $http, $location, $window){
		var vm = this;
        
		vm.addCategory = function(category){
            console.log("req header", $window.localStorage['mmtlt']);
            console.log("category colour", category.colour);
			var req = {
         			method: 'POST',
         			url: 'https://192.168.1.144:8443/category/add',
         			headers: {
           					'Content-Type': "application/json",
                            'Authorization' : $window.localStorage['mmtlt']
        			},
         			data: JSON.stringify(category)
      		}
      		// make server request
      		$http(req).then(
        			function(){
          				// SUCCESS: change the path
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Category created'
   						});
          				$location.path('/app/categories');
        			},
        			function(response){
                           console.log("response",angular.toJson(response, true));
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating category"
     							    // template: response.data
   						   });
       				}
       		);

		}
	};
})();