(function () {
	'use strict';

	angular.module('theAccountant').controller('notificationCtrl', ['$stateParams', '$ionicPopup', '$http', '$state', '$window','notificationApi', '$rootScope', notificationCtrl]);

	function notificationCtrl($stateParams, $ionicPopup, $http, $state, $window, notificationApi, $rootScope) {
		var vm = this;
		vm.moreData = false;
    vm.notifications = [];
    vm.offset = 0;
    vm.defaultCurrency = $window.localStorage['defaultCurrency'];
    notificationApi.getNotifications(vm.offset, function (data) {
      console.log(data);
    	vm.notifications = data;
    })
    vm.resolveNotificationColour = function(notification){
      if(notification.priority == "HIGH"){
        return "#B22222";
      }
      return "#FF8C00";
    }
//    vm.loadMoreData = function(){
//      if(vm.moreData == false){
//            vm.offset = vm.offset + 5;
//            notificationApi.getNotifications(vm.offset, function (data) {
//                  console.log(data);
//                	vm.notifications.push(data);
//                	if(data.length<5){
//                	  vm.moreData = true;
//                	}
//            })
//            $rootScope.$broadcast('scroll.infiniteScrollComplete');
//      }
//    }
	};
})();
