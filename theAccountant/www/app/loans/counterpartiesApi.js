(function () {
	'use strict';

	angular.module('theAccountant').factory('counterpartiesApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', counterpartiesApi]);

	function counterpartiesApi($http, $window, $q, $ionicPopup, $location, host_name) {

		var currentCounterpartyId;
		var currentCounterparties = [];

		//get all expenses
		function getAllCounterparties(callback) {
			$http.get(host_name + "/counterparties", {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				if (data != null) {
					currentCounterparties = data;
				}
				callback(currentCounterparties);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});

		}

		function addCounterparty(counterparty, changePath) {
			var req = {
				method : 'POST',
				url : host_name + '/counterparties',
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(counterparty)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				currentCounterparties.push(response.data);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Counterparty created'
					});
				if (changePath == true) {
					$location.path('/app/counterparties');
				} else {

					counterparty.currency = $window.localStorage['defaultCurrency'];
				}
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error creating counterparty",
						template : response.message
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(response);
			});
		}

		function updateCounterparty(counterparty, index) {
			var req = {
				method : 'PUT',
				url : host_name + '/counterparties/' + counterparty.id,
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(counterparty)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				console.log(index);
				currentCounterparties.splice(index, 1);
				currentCounterparties.push(counterparty);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Counterparty updated'
					});
				$location.path('/app/counterparties');
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error updating counterparty"
						// template: response.data
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		function deleteCounterparty(counterparty, callback) {
		  console.log(counterparty);
			$http.delete(host_name + "/counterparties/" + counterparty.id, {
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
		}

		return {
			addCounterparty : addCounterparty,
			deleteCounterparty : deleteCounterparty,
			updateCounterparty : updateCounterparty,
			getAllCounterparties : getAllCounterparties
		};
	}

})();
