(function () {
  'use strict';

  angular.module('theAccountant').factory('InitService', ['$rootScope', 'notificationApi', 'paymentApi', InitService]);

  function InitService($rootScope, notificationApi, paymentApi) {

    /**
     * Initialize application global variables and requests
     */
    function init() {
      notificationApi.getTotalNotifications(function (data) {
        $rootScope.totalNotifications = 0;
        if (data && data.total) {
          $rootScope.totalNotifications = data.total;
        } else {
          console.warn(" No notification found: data = " + JSON.stringify(data));
        }
      });

      paymentApi.getPaymentStatus(function (data) {
        $rootScope.licencePaymentApproved = false;
        if (data && data.paymentApproved) {
          $rootScope.licencePaymentApproved = data.paymentApproved;
        } else {
          console.warn(" Payment not approved: data = " + JSON.stringify(data));
        }
      });

    }

    return {
      init: init
    };
  }

})();
