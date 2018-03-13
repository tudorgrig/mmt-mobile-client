(function () {
	'use strict';

	angular.module('theAccountant').factory('notificationApi', ['$http', '$window', '$q', '$location', 'host_name', notificationApi]);

	function notificationApi($http, $window, $q, $location, host_name) {

		var currentNotifications = [];

		//get all categories
		function getNotifications(limit, offset, callback) {
		  if (limit == null) {
		    limit = 100;
      }
      if (offset == null) {
		    offset = 0;
      }

			$http.get(host_name + "/notifications?limit=" + limit + "&offset=" + offset, {
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

    //get total number of notifications for user
    function getTotalNotifications(callback) {

      $http.get(host_name + "/notifications/getTotal", {
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

		// delete notification
    function deleteNotification(notificationId, callback) {
      var req = {
        method : 'DELETE',
        url : host_name + "/notifications/" + notificationId,
        headers : {
          'Content-Type' : "application/json",
          'Authorization' : $window.localStorage['mmtlt']
        },
        data : null
      };
      $http(req).success(function (data) {
        callback(data);
      }).error(function (data, status, headers) {
        if (status === 401) {
          $location.url('/login');
        }
        return $q.reject(data);
      });
    };

		return {
			getNotifications : getNotifications,
      getTotalNotifications : getTotalNotifications,
      deleteNotification: deleteNotification

		};
	}

})();
