(function () {
	'use strict';

	angular.module('myMoneyTracker').factory('expenseApi', ['$http', '$window', '$q', '$ionicPopup', '$location', 'host_name', expenseApi]);

	function expenseApi($http, $window, $q, $ionicPopup, $location, host_name) {

		var currentExpenseId;
		var currentExpenses = [];
		var currentExpensesByInterval = [];
		var currentExpensesByIntervalAndCategory = []

		//get all expenses
		function getByInterval(fromTime, untilTime, callback) {
			$http.get(host_name + "/expense/find/*/" + fromTime + "/" + untilTime, {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				if (data != null) {
					currentExpensesByInterval = data;
				}
				callback(currentExpensesByInterval);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});

		}

		function getByIntervalAndCategory(categoryId, fromTime, untilTime, callback) {
			$http.get(host_name + "/expense/find/" + categoryId + '/' + fromTime + "/" + untilTime, {
				headers : {
					'Authorization' : $window.localStorage['mmtlt']
				}
			}).success(function (data) {
				if (data != null) {
					currentExpensesByIntervalAndCategory = data;
				}
				callback(currentExpensesByIntervalAndCategory);
			}).error(function (data, status, headers) {
				if (status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		//set current expense id
		function setExpenseId(expenseId) {
			currentExpenseId = expenseId;
		}

		function addExpense(expense, changePath) {
			var req = {
				method : 'POST',
				url : host_name + '/expense/add',
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(expense)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				currentExpenses.push(response.data);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Expense created'
					});
				if (changePath == true) {
					$location.path('/app/expenses');
				} else {
					expense.name = "";
					expense.description = "";
					expense.amount = "";
//					expense.frequency = "";
					expense.category = "";
					expense.creationDate = new Date();
					expense.currency = $window.localStorage['defaultCurrency'];
				}
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error creating expense",
						template : response.message
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(response);
			});
		}

		function updateExpense(expense, index) {
			var req = {
				method : 'POST',
				url : host_name + '/expense/update/' + expense.id,
				headers : {
					'Content-Type' : "application/json",
					'Authorization' : $window.localStorage['mmtlt']
				},
				data : JSON.stringify(expense)
			}
			// make server request
			$http(req).then(
				function (response) {
				// SUCCESS: change the path
				console.log(index);
				currentExpenses.splice(index, 1);
				currentExpenses.push(expense);
				var alertPopup = $ionicPopup.alert({
						title : 'Success',
						template : 'Expense updated'
					});
				$location.path('/app/expenses');
			},
				function (response) {
				var alertPopup = $ionicPopup.alert({
						title : "Error updating expense"
						// template: response.data
					});
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(data);
			});
		}

		function deleteExpense(expense, callback) {
			$http.delete (host_name + "/expense/delete/" + expense.id, {
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
			setExpenseId : setExpenseId,
			addExpense : addExpense,
			deleteExpense : deleteExpense,
			updateExpense : updateExpense,
			getByInterval : getByInterval,
			getByIntervalAndCategory : getByIntervalAndCategory
		};
	}

})();
