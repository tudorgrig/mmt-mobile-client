(function () {
	'use strict';

	angular.module('theAccountant').factory('paymentApi', ['$http', '$window', '$q', '$location', 'host_name', '$rootScope', paymentApi]);

	function paymentApi($http, $window, $q, $location, host_name, $rootScope) {

    /**
     * Check payment status for current user
     */
    var getPaymentStatus = function(callback) {

      $http.get(host_name + '/payments/status', {
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
    };

		return {
      getPaymentStatus : getPaymentStatus

		};
	}

})();
