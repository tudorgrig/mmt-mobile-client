(function () {
	'use strict';

	angular.module('theAccountant').controller('notificationCtrl', ['$state', '$ionicPopup', '$timeout', '$window','notificationApi', '$rootScope', notificationCtrl]);

	function notificationCtrl($state, $ionicPopup, $timeout, $window, notificationApi, $rootScope) {
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

    /**
     * Initialize controller data
     */
    vm.initController = function() {
      if ($rootScope.licencePaymentApproved == null) {
        $timeout(vm.initController, 500);
      } else if ($rootScope.licencePaymentApproved === false) {
        var myPopup = $ionicPopup.show({
          title : '<i class="ion-locked"></i> Locked',
          subTitle : 'Loans, Notifications and Category limit are only available for contributors. In order to be able to use this functions you can ' +
          'contribute to the application accessing PAYMENT page. Thank you!',
          buttons : [
            {
              text : '<i class="ion-locked"></i> Unlock notifications',
              type : 'button-small button-positive',
              onTap : function (e) {
                $state.go('app.payment');
              }
            },{
              text : '<i class="ion-home"></i> Home page',
              type : 'button-small button-positive',
              onTap : function (e) {
                $state.go('app.expenses');
              }
            }
          ]
        });
      } else {
        getAllNotifications(vm.limit, vm.offset);
      }
    };
    vm.initController();

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
