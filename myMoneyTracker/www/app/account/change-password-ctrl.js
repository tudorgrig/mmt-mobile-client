(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('changePasswordCtrl', ['host_name', '$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', '$scope', 'accountApi', '$q', changePasswordCtrl]);

	function changePasswordCtrl(host_name, $stateParams, $interval, $ionicPopup, $http, $location, $window, $scope, accountApi, $q) {
     var vm = this;

     vm.changePassword = function(changePasswordObj){
        if(changePasswordObj.newPassword1 != changePasswordObj.newPassword2){
          var alertPopup = $ionicPopup.alert({
          						title : 'Incorrect new password',
          						template : 'Please retype the same password twice!',
          						buttons: [
                         {
                           text: '<b>Ok</b>',
                           type: 'button-dark'
                         }
                      ]
          });
          return;
        }
        var changePasswordDTO = {};
        changePasswordDTO.op = changePasswordObj.oldPassword;
        changePasswordDTO.np = changePasswordObj.newPassword1;
        var req = {
        		method : 'POST',
        		url : host_name + '/user/change_password',
        		headers : {
        			  'Content-Type' : "application/json",
        			  'Authorization' : $window.localStorage['mmtlt']
        		},
        		data : JSON.stringify(changePasswordDTO)
        }
        // make server request
        $http(req).then(
        		function (response) {
        				var alertPopup = $ionicPopup.alert({
        						title : 'Success',
        						template : 'Password updated'
        				});
        				$location.path('/app/login');
        		},
        		function (response) {
        		    console.log(response);
        				var alertPopup = $ionicPopup.alert({
        						title : "Error updating password",
        						template : response.data.message
        				});
        				if (response.status === 401) {
        					$location.url('/login');
        				}
        				return $q.reject(response);
        		}
        );
     }
	};
})();
