(function (){
    'use strict';
    
    angular.module('myMoneyTracker').factory('incomeApi', ['$http', '$window', '$ionicPopup', '$location', incomeApi]);
    
    function incomeApi($http, $window, $ionicPopup, $location){
        
        var currentIncomeId;
        var currentIncomes = [];
        
        //get all incomes
        function getIncomes(callback){
            $http.get("https://192.168.1.144:8443/income/find_all", {
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
        
        //set current expense id
        function setIncomeId(incomeId){
            currentIncomeId = incomeId;
        }
        
        function addIncome(income, changePath){
            var req = {
         			method: 'POST',
         			url: 'https://192.168.1.144:8443/income/add',
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
         			url: 'https://192.168.1.144:8443/income/update/'+income.id,
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
          			       var alertPopup = $ionicPopup.alert({
     							    title: "Error creating income"
     							    // template: response.data
   						   });
       				}
       		);
        }
        
        function deleteIncome(income, callback){
            $http.delete("https://192.168.1.144:8443/income/delete/"+income.id, {
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
            updateIncome: updateIncome
        };
    }
    
})();