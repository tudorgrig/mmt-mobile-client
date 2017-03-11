(function () {
	'use strict';

	angular.module('theAccountant').controller('accountCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', '$scope', 'accountApi', accountCtrl]);

	function accountCtrl($stateParams, $interval, $ionicPopup, $http, $location, $window, $scope, accountApi) {
		var vm = this;
    vm.loggedUsername = $window.localStorage['username'];
    vm.loggedDefaultCurrency = $window.localStorage['defaultCurrency'];
    vm.loggedEmail = $window.localStorage['email'];
    vm.defaultCurrency;

    vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
       vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
       if($window.localStorage['hasInternet'] != undefined) {
              vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
       }
    }, 1000)

    vm.currencies = ["EUR", "USD", "GBP", "RON", "JPY", "BGN", "CZK", "DKK", "HUF", "PLN", "SEK", "CHF", "NOK",
                    "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN",
                    "MYR", "NZD", "PHP", "SGD", "THB", "ZAR"];

    vm.changeDefaultCurrency = function(){
       var myPopup = $ionicPopup.show({
            template: '<select type="text" class="form-control" id="currency_select" placeholder="currency" ng-model="vm.defaultCurrency" required><option ng-repeat="currency in vm.currencies" value="{{currency}}" required>{{currency}}</option></select>',
            title: 'Select new default currency for user',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Change</b>',
                type: 'button-dark',
                onTap: function(e) {
                    accountApi.changeDefaultCurrency(vm.defaultCurrency);
                }
              }
            ]
       });
    }
	};
})();
