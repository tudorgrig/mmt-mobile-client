(function (){
    'use strict';
    
    angular.module('myMoneyTracker').factory('expenseApi', ['$http', '$window', '$ionicPopup', '$location', expenseApi]);
    
    function expenseApi($http, $window, $ionicPopup, $location){
        
        var currentExpenseId;
        var currentExpenses = [];
        
        //get all expenses
        function getExpenses(callback){
            $http.get("https://192.168.1.144:8443/expense/find_all", {
                        headers : {
                              'Authorization' : $window.localStorage['mmtlt']
                        }
            }).success(function(data){
                    if(data != "" && data != null){
                        currentExpenses = data;
                    }
                    callback(currentExpenses);
            }).error(function(data, status, headers) {
                
            });
        
        }
        
        //set current expense id
        function setExpenseId(expenseId){
            currentExpenseId = expenseId;
        }
        
        function addExpense(expense, changePath){
            var req = {
         			method: 'POST',
         			url: 'https://192.168.1.144:8443/expense/add',
         			headers: {
           					'Content-Type': "application/json",
                            'Authorization' : $window.localStorage['mmtlt']
        			},
         			data: JSON.stringify(expense)
      		}
      		// make server request
      		$http(req).then(
        			function(response){
          				// SUCCESS: change the path
                        currentExpenses.push(response.data);
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Expense created'
   						});
          				if(changePath == true){
                              $location.path('/app/expenses');
                        }else{
                            expense.name = "";
                            expense.description = "";
                            expense.amount = "";
                            expense.frequency = "";
                            expense.category = "";
                            expense.creationDate = "";
                            expense.currency = "";
                        }
        			},
        			function(response){
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating expense",
     							    template: response.message
   						   });
       				}
       		);
        }
        
        
        function updateExpense(expense, index){
            var req = {
         			method: 'POST',
         			url: 'https://192.168.1.144:8443/expense/update/'+expense.id,
         			headers: {
           					'Content-Type': "application/json",
                            'Authorization' : $window.localStorage['mmtlt']
        			},
         			data: JSON.stringify(expense)
      		}
      		// make server request
      		$http(req).then(
        			function(response){
          				// SUCCESS: change the path
                          console.log(index);
                          currentExpenses.splice(index,1);
                          currentExpenses.push(expense);
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Expense updated'
   						});
          			    $location.path('/app/expenses');
        			},
        			function(response){
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating expense"
     							    // template: response.data
   						   });
       				}
       		);
        }
        
        function deleteExpense(expense, callback){
            $http.delete("https://192.168.1.144:8443/expense/delete/"+expense.id, {
                 headers : {
                      'Authorization' : $window.localStorage['mmtlt']
                 }
            }).success(function(data){
                callback(data);
            });
        }
        
        return {
            getExpenses: getExpenses,
            setExpenseId: setExpenseId,
            addExpense: addExpense,
            deleteExpense: deleteExpense,
            updateExpense: updateExpense
        };
    }
    
})();