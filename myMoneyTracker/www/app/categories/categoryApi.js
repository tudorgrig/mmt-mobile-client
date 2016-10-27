(function () {
	'use strict';

	angular.module('myMoneyTracker').factory('categoryApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', categoryApi]);

	function categoryApi($http, $window, $q, $ionicPopup, $location, host_name) {

		var currentCategoryId;
		var currentCategories = [];

		//get all categories
		function getCategories(callback) {
			$http.get(host_name + "/category/find_all", {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				if (data != "" && data != null) {
					currentCategories = data;
				}
				callback(currentCategories);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});

		}

		//set current category id
		function setCategoryId(categoryId) {
			currentCategoryId = categoryId;
		}

		function addCategory(category, changePath) {
			var req = {
				method : 'POST',
				url : host_name + '/category/add',
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(category)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				currentCategories.push(response.data);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Category created'
					});
				if (changePath == true) {
					$location.path('/app/categories');
				} else {
					category.name = "";
					category.colour = "";
				}
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error creating category"
						// template: response.data
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		function updateCategory(category, index) {
			var req = {
				method : 'POST',
				url : host_name + '/category/update/' + category.id,
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(category)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				console.log(index);
				currentCategories.splice(index, 1);
				currentCategories.push(category);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Category updated'
					});
				$location.path('/app/categories');
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error creating category"
						// template: response.data
					});
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		function deleteCategory(category, callback) {
			$http.delete (host_name + "/category/delete/" + category.id, {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				callback(data);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		return {
			getCategories : getCategories,
			setCategoryId : setCategoryId,
			addCategory : addCategory,
			deleteCategory : deleteCategory,
			updateCategory : updateCategory
		};
	}

})();
