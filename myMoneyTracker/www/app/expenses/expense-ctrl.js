(function(){
	'use strict';
	
	angular.module('myMoneyTracker').controller('expenseCtrl', ['$stateParams', '$ionicPopup', '$http', '$location', '$window', '$ionicActionSheet', '$ionicListDelegate', expenseCtrl]);

	function expenseCtrl($stateParams, $ionicPopup, $http, $location, $window,$ionicActionSheet, $ionicListDelegate){
		var vm = this;
		
		vm.addExpense = function(expense){
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
        			function(){
          				// SUCCESS: change the path
          				var alertPopup = $ionicPopup.alert({
     							title: 'Success',
     							template: 'Expense created'
   						});
          				$location.path('/app/expenses');
        			},
        			function(response){
                           console.log("response",response);
          			       var alertPopup = $ionicPopup.alert({
     							    title: 'Error when creating expense'
     							    // template: response.data
   						   });
       				}
       		);

		}
        
        
        // method to confirm and likely delete expense
        vm.confirmDelete = function (expenseId) {
                // show ionic actionSheet to confirm delete operation
               // show() returns a function to hide the actionSheet
               console.log(expenseId);
               var hideSheet = $ionicActionSheet.show({
                destructiveText: (ionic.Platform.isAndroid()?'<i class="icon ion-android-exit assertive"></i> ':'')+'End Task',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                destructiveButtonClicked: function(index) {
                    console.log('Clicked end task');
                    //your function
                    return true;
                }
            });
            //     var hideSheet = $ionicActionSheet.show({
            //         titleText: 'Are you sure that you\’d like to delete this expense?',
            //         cancelText: 'Cancel',
            //         destructiveText: 'Delete',
            //         cancel: function () {
            //                 // if the user cancel’s deletion, hide the list item’s delete button
            //                 $ionicListDelegate.closeOptionButtons();
            //         },
            //         destructiveButtonClicked: function () {
            //                 // delete expense by its id property
            //                 // $scope.expenses = ExpenseSvc.deleteExpense(expenseId);
            //                 // hide the confirmation dialog
            //                 hideSheet();
            //         }
            // });
        };
    }
})();