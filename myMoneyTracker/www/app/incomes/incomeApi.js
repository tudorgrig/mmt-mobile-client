(function (){
    'use strict';
    
    angular.module('myMoneyTracker').factory('incomeApi', ['$http', '$window', '$ionicPopup', '$location', 'host_name', incomeApi]);
    
    function incomeApi($http, $window, $ionicPopup, $location, host_name){
        
        var currentIncomeId;
        var currentIncomes = [];
        
        //get all incomes
        function getIncomes(callback){
            $http.get( host_name + "/income/find_all", {
                        headers : {
                              'Authorization' : $window.localStorage['mmtlt']
                        }
            }).success(function(data){
                    if(data != "" && data != null){
                        currentIncomes = data;
                    }
                    callback(currentIncomes);
            }).error(function(data, status, headers) {
                
            });
        
        }
        
        function getIncomesByInterval(fromDate, untilDate, currency, callback){
            $http.get( host_name + "/income/findByInterval/" + fromDate + "/" + untilDate + "/" + currency, {
                        headers : {
                              'Authorization' : $window.localStorage['mmtlt']
                        }
            }).success(function(data){
                    if(data != null){
                        currentIncomes = data;
                    }
                    callback(currentIncomes);
            }).error(function(data, status, headers) {
                
            });
        
        }
        
        //set current expense id
        function setIncomeId(incomeId){
            currentIncomeId = incomeId;
        }
        
        function addIncome(income, changePath){
            var req = {
         			method: 'POST',
         			url: host_name + '/income/add',
         			headers: {
           					'Content-Type': "application/json",
                            'Authorization' : $window.localStorage['mmtlt']
        			},
         			data: JSON.stringify(income)
      		}
      		// make server request
      		$http(req).then(
        			function(response){
          				// SUCCESS: change the path
                        currentIncomes.push(response.data);
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Income created'
   						});
          				if(changePath == true){
                              $location.path('/app/incomes');
                        }else{
                            income.name = "";
                            income.description = "";
                            income.amount = "";
                            income.currency= "";
                            income.frequency = "";
                            income.creationDate = "";
                        }
        			},
        			function(response){
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating income",
     							    template: response.message
   						   });
       				}
       		);
        }
        
        
        function updateIncome(income, index){
            var req = {
         			method: 'POST',
         			url: host_name + '/income/update/'+income.id,
         			headers: {
           					'Content-Type': "application/json",
                            'Authorization' : $window.localStorage['mmtlt']
        			},
         			data: JSON.stringify(income)
      		}
      		// make server request
      		$http(req).then(
        			function(response){
          				// SUCCESS: change the path
                          console.log(index);
                          currentIncomes.splice(index,1);
                          currentIncomes.push(income);
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Income updated'
   						});
          			    $location.path('/app/incomes');
        			},
        			function(response){
                        console.log(response);
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating income"
     							    // template: response.data
   						   });
       				}
       		);
        }
        
        function deleteIncome(income, callback){
            $http.delete( host_name + "/income/delete/"+income.id, {
                 headers : {
                      'Authorization' : $window.localStorage['mmtlt']
                 }
            }).success(function(data){
                callback(data);
            });
        }
        
        return {
            getIncomes: getIncomes,
            setIncomeId: setIncomeId,
            addIncome: addIncome,
            deleteIncome: deleteIncome,
            updateIncome: updateIncome,
            getIncomesByInterval: getIncomesByInterval
        };
    }
    
})();