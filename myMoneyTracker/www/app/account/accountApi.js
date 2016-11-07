(function () {
	'use strict';

	angular.module('myMoneyTracker').factory('accountApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', accountApi]);

	function accountApi($http, $window, $q, $ionicPopup, $location, host_name) {

      function changeDefaultCurrency(defaultCurrency) {
          var req = {
          				method : 'POST',
          				url : host_name + '/user/default_currency',
          				headers : {
          					'Content-Type' : "application/json",
          					'Authorization' : $window.localStorage['mmtlt']
          				},
          				data : JSON.stringify(defaultCurrency)
          			}
          // make server request
          $http(req).then(
          				function (response) {
          				// SUCCESS: change the path
          				$window.localStorage['defaultCurrency'] = defaultCurrency;
          				var alertPopup = $ionicPopup.alert({
          						title : 'Success',
          						template : 'Default currency updated'
          					});
          			},
          				function (response) {
          				var alertPopup = $ionicPopup.alert({
          						title : "Error updating currency",
          					  template: response.data
          					});
          				if (response.status === 401) {
          					$location.url('/login');
          				}
          				return $q.reject(data);
          			});
      }

      return {
      			changeDefaultCurrency : changeDefaultCurrency
      		};

	}

})();
