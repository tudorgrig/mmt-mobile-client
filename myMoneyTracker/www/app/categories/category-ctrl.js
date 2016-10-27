(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('categoryCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window', 'categoryApi', categoryCtrl]);

	function categoryCtrl($stateParams, $ionicPopup, $http, $state, $window, categoryApi) {
		var vm = this;
		vm.categories = [];
		categoryApi.getCategories(function (data) {
			vm.categories = data;
		})
		vm.selectCategory = function (category) {
			console.log(category.name);
		}

		vm.updateCategory = function (category, index) {
			console.log(index);
			$state.go('app.category-edit', {
				id : category.id,
				name : category.name,
				colour : category.colour,
				threshold : category.threshold,
				index : index
			});
		}

		vm.confirmDelete = function (category, index) {
			var myPopup = $ionicPopup.show({
					title : 'Confirm delete',
					subTitle : 'Are you sure you want to delete this category? ALL EXPENSES FOR THIS CATEGORY WILL GET DELETED',
					buttons : [{
							text : 'Cancel',
							type : 'button-positive'
						}, {
							text : '<b>Delete</b>',
							type : 'button-assertive',
							onTap : function (e) {
								categoryApi.deleteCategory(category, function (data) {
									vm.categories.splice(index, 1);
								});
							}
						}
					]
				});
		}

	};
})();
