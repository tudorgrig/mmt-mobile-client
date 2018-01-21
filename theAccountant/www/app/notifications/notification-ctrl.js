(function () {
	'use strict';

	angular.module('theAccountant').controller('notificationCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window','notificationApi', '$rootScope', notificationCtrl]);

	function notificationCtrl($stateParams, $ionicPopup, $http, $state, $window, notificationApi, $rootScope) {
		var vm = this;
    vm.defaultCurrency = $window.localStorage['defaultCurrency'];

    vm.limit = 20;
    vm.offset = 0;
    vm.showMoreButton = true;
    vm.notifications = [];

    var getAllNotifications = function(limit, offset) {
      notificationApi.getNotifications(limit, offset, function (notificationsResponse) {
        console.log(notificationsResponse);
        vm.notifications = vm.notifications.concat(notificationsResponse);

        if (!notificationsResponse.length || notificationsResponse.length < limit){
          vm.showMoreButton = false;
        }
      });
    };

    getAllNotifications(vm.limit, vm.offset);

    vm.resolveNotificationColour = function(notification){
      if(notification.priority == "HIGH"){
        return "assertive";
      } else if (notification.priority == "MEDIUM") {
        return "energized";
      }
      return "stable";
    };

    vm.filter = {
      priority: {
        HIGH: true,
        MEDIUM: true,
        null: true
      }
    };

    vm.deleteNotification = function(notification, index) {
      var myPopup = $ionicPopup.show({
        title : 'Confirm delete',
        subTitle : 'Delete selected notification?',
        buttons : [{
          text : 'Cancel',
          type : 'button-dark'
        }, {
          text : '<b>Delete</b>',
          type : 'button-assertive',
          onTap : function (e) {
            notificationApi.deleteNotification(notification.id, function () {
              vm.notifications.splice(index, 1);
              vm.offset--;
              $rootScope.totalNotifications--;
            })
          }
        }
        ]
      });
    };

    vm.showMoreNotifications = function() {
      vm.offset = vm.offset + vm.limit;
      getAllNotifications(vm.limit, vm.offset);
    }

	};
})();
