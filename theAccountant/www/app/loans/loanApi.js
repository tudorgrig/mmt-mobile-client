(function () {
	'use strict';

	angular.module('theAccountant').factory('loanApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', loanApi]);

	function loanApi($http, $window, $q, $ionicPopup, $location, host_name) {

		function addLoan(loan, changePath) {
		  console.log(loan);
			var req = {
				method : 'POST',
				url : host_name + '/loans',
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(loan)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Loan created'
					});
				if (changePath == true) {
					$location.path('/app/counterparties');
				} else {
					loan.description = "";
					loan.amount = "";
					loan.creationDate = new Date();
					loan.untilDate = new Date(loan.creationDate + 1);
					loan.lender = false;
					loan.currency = $window.localStorage['defaultCurrency'];
				}
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error creating loan",
						template : response.message
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(response);
			});
		}

		return {
			addLoan : addLoan
		};
	}

})();
