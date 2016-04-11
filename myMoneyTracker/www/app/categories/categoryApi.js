(function (){
    'use strict';
    
    angular.module('myMoneyTracker').factory('categoryApi', ['$http', '$window', '$ionicPopup', '$location', categoryApi]);
    
    function categoryApi($http, $window, $ionicPopup, $location){
        
        var currentCategoryId;
        var currentCategories = [{}];
        
        //get all categories
        function getCategories(callback){
            $http.get("https://192.168.1.144:8443/category/find_all", {
                        headers : {
                              'Authorization' : $window.localStorage['mmtlt']
                        }
            }).success(function(data){
                    currentCategories = data;
                    callback(currentCategories);
            }).error(function(data, status, headers) {
            });
        
        }
        
        //set current category id
        function setCategoryId(categoryId){
            currentCategoryId = categoryId;
        }
        
        function addCategory(category, changePath){
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
        			function(response){
          				// SUCCESS: change the path43
                        currentCategories.push(response.data);
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Category created'
   						});
          				if(changePath == true){
                              $location.path('/app/categories');
                        }else{
                            category.name = "";
                            category.colour = "";
                        }
        			},
        			function(response){
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating category"
     							    // template: response.data
   						   });
       				}
       		);
        }
        
        function deleteCategory(category, callback){
            $http.delete("https://192.168.1.144:8443/category/delete/"+category.id, {
                 headers : {
                      'Authorization' : $window.localStorage['mmtlt']
                 }
            }).success(function(data){
                callback(data);
            });
        }
        
        return {
            getCategories: getCategories,
            setCategoryId: setCategoryId,
            addCategory: addCategory,
            deleteCategory: deleteCategory
        };
    }
    
})();