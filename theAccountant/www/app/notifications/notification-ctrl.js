(function () {
	'use strict';

	angular.module('theAccountant').controller('notificationCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window','notificationApi', notificationCtrl]);

	function notificationCtrl($stateParams, $ionicPopup, $http, $state, $window, notificationApi) {
		var vm = this;
    vm.notifications = [];
    vm.defaultCurrency = $window.localStorage['defaultCurrency'];
    notificationApi.getNotifications(function (data) {
      console.log(data);
    	vm.notifications = data;
    })
    vm.resolveNotificationColour = function(notification){
      if(notification.priority == "HIGH"){
        return "#B22222";
      }
      return "#FF8C00";
    }
	};
})();
