(function () {
	'use strict';

	angular.module('theAccountant').controller('addCategoryCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$location', '$window', 'categoryApi', addCategoryCtrl]);

	function addCategoryCtrl($stateParams, $interval, $ionicPopup, $http, $location, $window, categoryApi) {
		var vm = this;
    vm.category = {};
    vm.isAssertiveChecked = false;
    vm.isPositiveChecked = false;
    vm.isCalmChecked = false;
    vm.isBalancedChecked = false;
    vm.isEnergizedChecked = false;
    vm.isRoyalChecked = false;
    vm.isDarkChecked = false;

    vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
       vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)

		vm.addCategory = function (changePath) {
		  if(vm.category.colour == undefined){
        var alertPopup = $ionicPopup.alert({
        	  title : 'Add category error',
        		template : 'Please select one colour from the list',
        		buttons: [
                           {
                              text: 'Ok',
                              type: 'button-dark',
                           }
                        ]
        });
        return;
		  }
			categoryApi.addCategory(vm.category, changePath);
		}

		vm.updateSelection = function(colour){
		  if(colour == 'assertive'){
		    if(vm.isAssertiveChecked == false){
		      vm.category.colour = undefined;
		    } else {
		      vm.category.colour="assertive";
          vm.isPositiveChecked = false;
          vm.isCalmChecked = false;
          vm.isBalancedChecked = false;
          vm.isEnergizedChecked = false;
          vm.isRoyalChecked = false;
          vm.isDarkChecked = false;
		    }
		  }
		  else if(colour == 'positive'){
		    if(vm.isPositiveChecked == false){
		      vm.category.colour = undefined;
		    } else{
		      vm.category.colour="positive";
          vm.isAssertiveChecked = false;
          vm.isCalmChecked = false;
          vm.isBalancedChecked = false;
          vm.isEnergizedChecked = false;
          vm.isRoyalChecked = false;
          vm.isDarkChecked = false;
		    }
      }
      else if(colour == 'calm'){
        if(vm.isCalmChecked == false){
          vm.category.colour = undefined;
        }else{
          vm.category.colour="calm";
          vm.isAssertiveChecked = false;
          vm.isPositiveChecked = false;
          vm.isBalancedChecked = false;
          vm.isEnergizedChecked = false;
          vm.isRoyalChecked = false;
          vm.isDarkChecked = false;
        }
      }
      else if(colour == 'balanced'){
        if(vm.isBalancedChecked == false){
          vm.category.colour = undefined;
        }else {
          vm.category.colour="balanced";
          vm.isAssertiveChecked = false;
          vm.isPositiveChecked = false;
          vm.isCalmChecked = false;
          vm.isEnergizedChecked = false;
          vm.isRoyalChecked = false;
          vm.isDarkChecked = false;
        }
      }
      if(colour == 'energized'){
        if(vm.isEnergizedChecked == false){
          vm.category.colour = undefined;
        }else{
          vm.category.colour="energized";
          vm.isAssertiveChecked = false;
          vm.isPositiveChecked = false;
          vm.isCalmChecked = false;
          vm.isBalancedChecked = false;
          vm.isRoyalChecked = false;
          vm.isDarkChecked = false;
        }
      }
      else if(colour == 'royal'){
        if(vm.isRoyalChecked == false){
          vm.category.colour = undefined;
        } else{
          vm.category.colour="royal";
          vm.isAssertiveChecked = false;
          vm.isPositiveChecked = false;
          vm.isCalmChecked = false;
          vm.isBalancedChecked = false;
          vm.isEnergizedChecked = false;
          vm.isDarkChecked = false;
        }
      }
      else if(colour == 'dark'){
        if(vm.isDarkChecked == false){
          vm.category.colour = undefined;
        } else{
          vm.category.colour="dark";
          vm.isAssertiveChecked = false;
          vm.isPositiveChecked = false;
          vm.isCalmChecked = false;
          vm.isBalancedChecked = false;
          vm.isEnergizedChecked = false;
          vm.isRoyalChecked = false;
        }

      }
		}

	};
})();
