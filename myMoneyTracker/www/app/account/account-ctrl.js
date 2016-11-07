(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('accountCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', '$scope', 'accountApi', accountCtrl]);

	function accountCtrl($stateParams, $ionicPopup, $http, $location, $window, $scope, accountApi) {
		var vm = this;
    vm.loggedUsername = $window.localStorage['username'];
    vm.loggedDefaultCurrency = $window.localStorage['defaultCurrency'];
    vm.loggedEmail = $window.localStorage['email'];
    vm.defaultCurrency;

    vm.currencies = ["EUR", "USD", "GBP", "RON", "JPY", "CNY", "SDG", "MKD", "MXN", "CAD",
    			"ZAR", "AUD", "NOK", "ILS", "ISK", "SYP", "LYD", "UYU", "YER", "CSD",
    			"EEK", "THB", "IDR", "LBP", "AED", "BOB", "QAR", "BHD", "HNL", "HRK",
    			"COP", "ALL", "DKK", "MYR", "SEK", "RSD", "BGN", "DOP", "KRW", "LVL",
    			"VEF", "CZK", "TND", "KWD", "VND", "JOD", "NZD", "PAB", "CLP", "PEN",
    			"DZD", "CHF", "RUB", "UAH", "ARS", "SAR", "EGP", "INR", "PYG",
    			"TWD", "TRY", "BAM", "OMR", "SGD", "MAD", "BYR", "NIO", "HKD", "LTL",
    			"SKK", "GTQ", "BRL", "HUF", "IQD", "CRC", "PHP", "SVC", "PLN"];

    vm.changeDefaultCurrency = function(){
        var myPopup = $ionicPopup.show({
            template: '<select type="text" class="form-control" id="currency_select" placeholder="currency" ng-model="vm.defaultCurrency" required><option ng-repeat="currency in vm.currencies" value="{{currency}}" required>{{currency}}</option></select>',
            title: 'Select new default currency for user',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                    accountApi.changeDefaultCurrency(vm.defaultCurrency);
                }
              }
            ]
          });
    }
	};
})();
