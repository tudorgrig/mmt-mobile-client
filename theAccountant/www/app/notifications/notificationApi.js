(function () {
	'use strict';

	angular.module('theAccountant').factory('notificationApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', notificationApi]);

	function notificationApi($http, $window, $q, $ionicPopup, $location, host_name) {

		var currentNotifications = [];

		//get all categories
		function getNotifications(offset, callback) {
			$http.get(host_name + "/notifications?limit=50&offset="+offset, {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				if (data != "" && data != null) {
					currentNotifications = data;
				}
				callback(currentNotifications);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});

		}

		return {
			getNotifications : getNotifications
		};
	}

})();
