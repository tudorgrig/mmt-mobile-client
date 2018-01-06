(function () {
	'use strict';

	angular.module('theAccountant').factory('loanApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', loanApi]);

	function loanApi($http, $window, $q, $ionicPopup, $location, host_name) {

    var currentLoans = [];

		function addLoan(loan, changePath) {
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

		function getLoansByCounterparty(counterpartyId, callback) {
      $http.get(host_name + "/loans/" + counterpartyId, {
      		headers : {
      				'Authorization' : $window.localStorage['mmtlt']
      		}
      }).success(function (data) {
      		if (data != null) {
      				currentLoans = data;
      		}
      		callback(currentLoans);
      }).error(function (data, status, headers) {
      		if (status === 401) {
      				$location.url('/login');
      		}
      		return $q.reject(data);
      });

		}

    function getLoan(loanId, callback) {
      $http.get(host_name + "/loans/findOne/" + loanId, {
        headers : {
          'Authorization' : $window.localStorage['mmtlt']
        }
      }).success(function (data) {
        if (callback) {
          callback(data);
        }
        return $q.resolve(data);
      }).error(function (data, status, headers) {
        if (status === 401) {
          $location.url('/login');
        }
        return $q.reject(data);
      });

    }

		function update(loan, callback){
      var req = {
      		method : 'PUT',
      		url : host_name + '/loans/' + loan.id,
      		headers : {
      			'Content-Type' : "application/json",
      			'Authorization' : $window.localStorage['mmtlt']
      		},
      		data : JSON.stringify(loan)
      }
      // make server request
      $http(req).then(
      		function (response) {
      			var alertPopup = $ionicPopup.alert({
      				title : 'Success',
      				template : 'Loan updated'
      			});
      			$location.path('/app/counterparties');
      		},
      		function (response) {
      			var alertPopup = $ionicPopup.alert({
      						title : "Error updating loan"
      						// template: response.data
      			});
      			if (response.status === 401) {
      				$location.url('/login');
      			}
      			return $q.reject(data);
      		}
      );
    }

    function deleteLoan(loan, data) {
         $http.delete (host_name + "/loans/" + loan.id, {
         			headers : {
         					'Authorization' : $window.localStorage['mmtlt']
         			}
         			}).success(function (data) {
         				$location.path('/app/counterparties');
         			}).error(function (data, status, headers) {
         				if (status === 401) {
         					$location.url('/login');
         				}
         				return $q.reject(data);
         			});
    }

		return {
			addLoan : addLoan,
			getLoansByCounterparty : getLoansByCounterparty,
      getLoan : getLoan,
			update : update,
			deleteLoan : deleteLoan
		};
	}

})();
