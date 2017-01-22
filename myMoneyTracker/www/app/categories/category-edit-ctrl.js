(function () {
	'use strict';

	angular.module('myMoneyTracker').controller('categoryEditCtrl', ['$stateParams', '$window', '$interval', 'categoryApi', categoryEditCtrl]);

	function categoryEditCtrl($stateParams, $window, $interval, categoryApi) {
		var vm = this;

		vm.disableNoInternet;
    if($window.localStorage['hasInternet'] != undefined) {
    		  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
    }
    $interval(function(){
           if($window.localStorage['hasInternet'] != undefined) {
                  vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
           }
        }, 1000)

		vm.category = {
			id : $stateParams['id'],
			name : $stateParams['name'],
			colour : $stateParams['colour'],
			threshold : parseFloat($stateParams['threshold'])
		};
		vm.isCalmChecked = vm.category.colour === "calm";
		vm.isAssertiveChecked = vm.category.colour === "assertive";
		vm.isPositiveChecked = vm.category.colour === "positive";
		vm.isBalancedChecked = vm.category.colour === "balanced";
		vm.isEnergizedChecked = vm.category.colour === "energized";
		vm.isRoyalChecked = vm.category.colour === "royal";
		vm.isDarkChecked = vm.category.colour === "dark";

		vm.updateCategory = function () {
			categoryApi.updateCategory(vm.category, $stateParams['index']);
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
