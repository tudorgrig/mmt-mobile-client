(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('categoryCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', categoryCtrl]);

	function categoryCtrl($stateParams, $ionicPopup, $http, $location, $window, categoryApi){
		var vm = this;
        vm.categories = [];
        categoryApi.getCategories(function(data){
            vm.categories = data;
        })
        vm.selectCategory = function(category){
            console.log(category.name);
        }
        
        vm.confirmDelete = function(category, index){
            var myPopup = $ionicPopup.show({
                    title: 'Confirm delete',
                    subTitle: 'Are you sure you want to delete this category?',
                    buttons: [
                            { 
                                text: 'Cancel',
                                type: 'button-positive'
                            },
                            {
                                text: '<b>Delete</b>',
                                type: 'button-assertive',
                                onTap: function(e) {
                                    categoryApi.deleteCategory(category, function(data){
                                        vm.categories.splice(index, 1);
                                    });
                                }
                            }
                    ]
            });
       }
      
	};
})();