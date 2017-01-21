(function () {
    'use strict';

    angular.module('myMoneyTracker').controller('statisticsCtrl', ['$stateParams', '$interval', '$ionicPopup', '$http', '$state', '$window', '$ionicActionSheet', '$ionicListDelegate', 'expenseApi', 'incomeApi', 'categoryApi', statisticsCtrl]);

    function statisticsCtrl($stateParams, $interval, $ionicPopup, $http, $state, $window, $ionicActionSheet, $ionicListDelegate, expenseApi, incomeApi, categoryApi) {
        var vm = this;

        vm.defaultCurrency = $window.localStorage['defaultCurrency'];
        //expense data
        vm.expenses = [];
        var date = new Date();
        vm.expenseChartFromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        vm.expenseChartUntilDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        vm.labelsBar = ["Categories"];
        vm.seriesBar = [];
        vm.dataBar = [];
        vm.colorsBar = [];

        //incomesVsExpenses data
        vm.expenses2 = [];
        vm.incomes2 = [];
        vm.expensesSum = 0;
        vm.incomesSum = 0;
        vm.netBalance = vm.incomesSum - vm.expensesSum;
        vm.incomesVsExpensesChartFromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        vm.incomesVsExpensesChartUntilDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        vm.incomesVsExpensesLabelsBar = ["Incomes", "Expenses"];
        vm.incomesVsExpensesSeriesBar = [];
        vm.incomesVsExpensesDataBar = [];
        vm.incomesVsExpensesColorsBar = [];

        //pie chart
        vm.categories = [];
        vm.expensesByCategory = [];
        categoryApi.getCategories(function (data) {
            vm.categories = data;
            vm.selectedCategory = vm.categories[0];
            vm.updateExpensesByCategory();
        })
        vm.expenseByCategoryChartFromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        vm.expenseByCategoryChartUntilDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        vm.labelsPie = [];
        vm.dataPie = [];
        vm.showAllExpensesChart = true;
        vm.showCategoryExpensesChart = true;
        vm.showIncomesChart = true;
        vm.showIncomesVsExpensesChart = true;

        vm.disableNoInternet;
        if($window.localStorage['hasInternet'] != undefined) {
           vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
        }
        $interval(function(){
               if($window.localStorage['hasInternet'] != undefined) {
                      vm.disableNoInternet = !JSON.parse($window.localStorage['hasInternet']);
               }
            }, 1000)

        vm.viewIncomesVsExpensesChart = function(){
            vm.showIncomesVsExpensesChart = !vm.showIncomesVsExpensesChart;
        }

        vm.viewAllExpensesChart = function(){
            vm.showAllExpensesChart = !vm.showAllExpensesChart;
        }

        vm.viewCategoryExpensesChart = function(){
            vm.showCategoryExpensesChart = !vm.showCategoryExpensesChart;
        }

        vm.viewIncomesChart = function(){
            vm.showIncomesChart = !vm.showIncomesChart;
        }

        vm.updateExpenses = function () {
            expenseApi.getByInterval(vm.expenseChartFromDate.getTime(), vm.expenseChartUntilDate.getTime(), function (data) {

                vm.expenses = [];
                vm.labelsBar = ["Categories"];
                vm.seriesBar = [];
                vm.dataBar = [];
                vm.colorsBar = [];
                vm.expenses = data;
                if (data != "") {
                    vm.expenses.forEach(function (expense) {

                        var d = new Date(expense.creationDate);

                        var categ_index = vm.seriesBar.indexOf(expense.category.name);
                        if (categ_index > -1) {
                            if (expense.defaultCurrency == null) {
                                var amounts = [expense.amount + vm.dataBar[categ_index][0]];
                                vm.dataBar[categ_index] = amounts;
                            } else {
                                var amounts = [expense.defaultCurrencyAmount + vm.dataBar[categ_index][0]];
                                vm.dataBar[categ_index] = amounts;
                            }
                        } else {
                            vm.seriesBar.push(expense.category.name);
                            if (expense.category.colour === "assertive") {
                                vm.colorsBar.push("#FD1F5E");
                            }
                            if (expense.defaultCurrency == null) {
                                var amounts = [expense.amount];
                                vm.dataBar.push(amounts);
                            } else {
                                var amounts = [expense.defaultCurrencyAmount];
                                vm.dataBar.push(amounts);
                            }
                        }

                    })
                }
            })
        }

        vm.updateIncomesVsExpensesChart = function (){
            expenseApi.getByInterval(vm.incomesVsExpensesChartFromDate.getTime(), vm.incomesVsExpensesChartUntilDate.getTime(), function (data) {
              incomeApi.getIncomesByInterval(vm.incomesVsExpensesChartFromDate.getTime(), vm.incomesVsExpensesChartUntilDate.getTime(), function (data2) {
                  vm.expenses2 = [];
                  vm.incomes2 = [];
                  vm.expensesSum = 0;
                  vm.incomesSum = 0;
                  vm.incomesVsExpensesLabelsBar = ["Incomes", "Expenses"];
                  vm.incomesVsExpensesSeriesBar = ["Incomes", "Expenses"];
                  vm.incomesVsExpensesDataBar = [];
                  vm.incomesVsExpensesColorsBar = [];
                  vm.expenses2 = data;
                  vm.incomes2 = data2;
                  if(vm.expenses2.length > 0){
                    for (var i = 0; i < vm.expenses2.length; i++) {
                        if (vm.expenses2[i].defaultCurrency == null) {
                           vm.expensesSum = vm.expensesSum + vm.expenses2[i].amount;
                        } else {
                           vm.expensesSum = vm.expensesSum + vm.expenses2[i].defaultCurrencyAmount;
                        }
                    }
                  }
                  if(vm.incomes2.length > 0){
                    for (var i = 0; i < vm.incomes2.length; i++) {
                      if (vm.incomes2[i].defaultCurrencyAmount == null) {
                         vm.incomesSum = vm.incomesSum + vm.incomes2[i].amount;
                      } else {
                         vm.incomesSum = vm.incomesSum + vm.incomes2[i].defaultCurrencyAmount;
                      }
                    }
                  }
                  vm.incomesVsExpensesDataBar.push(vm.incomesSum);
                  vm.incomesVsExpensesDataBar.push(vm.expensesSum);
                  vm.incomesVsExpensesDataBar.push(0);
                  vm.netBalance = vm.incomesSum - vm.expensesSum;
              })
            })
        }

        vm.updateExpensesByCategory = function () {
            expenseApi.getByIntervalAndCategory(vm.selectedCategory.id, vm.expenseByCategoryChartFromDate.getTime(), vm.expenseByCategoryChartUntilDate.getTime(), function (data) {
                vm.expensesByCategory = [];
                vm.labelsPie = [];
                vm.dataPie = [];
                vm.expensesByCategory = data;
                vm.expensesByCategory.forEach(function (expense) {
                    var categ_index = vm.labelsPie.indexOf(expense.category.name);
                    if (categ_index > -1) {
                        if(expense.defaultCurrencyAmount == null){
                            vm.dataPie[categ_index] = expense.amount + vm.dataPie[categ_index];
                        } else{
                            vm.dataPie[categ_index] = expense.defaultCurrencyAmount + vm.dataPie[categ_index];
                        }
                    } else {
                        if(expense.defaultCurrencyAmount == null){
                            vm.labelsPie.push(expense.name + " (" + expense.currency + ")");
                            vm.dataPie.push(expense.amount);
                        } else {
                            vm.labelsPie.push(expense.name + " (" + expense.defaultCurrency + ")");
                            vm.dataPie.push(expense.defaultCurrencyAmount);
                        }
                    }

                })

            })
        }


        vm.updateIncomes = function (yearChanged) {
            var month_index = new Date().getMonth();
            if (yearChanged === true) {
                if (vm.selected_year != (1900 + new Date().getYear())) {
                    month_index = 11;
                    vm.monthsArray = vm.extractMonthAsString(month_index, true);
                    vm.selected_month = vm.extractMonthAsString(month_index, false);
                } else {
                    vm.monthsArray = vm.extractMonthAsString(new Date().getMonth(), true);
                    vm.selected_month = vm.extractMonthAsString(new Date().getMonth(), false);
                }
            }

            // graphic arrays
            // - linear
            vm.labelsLinear = vm.extractMonthAsString(month_index, true);
            vm.seriesLinear = [''];
            vm.dataLinear = [vm.generateZeroesArray(month_index + 1)];

            incomeApi.getIncomesByInterval(new Date(vm.selected_year, 0, 1).getTime(), new Date(vm.selected_year, 11, 31).getTime(), function (data) {
                vm.incomes = data;
                vm.incomes.forEach(function (income) {

                    var d = new Date(income.creationDate);
                    income.monthAsInt = d.getMonth();
                    income.monthAsString = vm.extractMonthAsString(d.getMonth(), false);
                    income.year = 1900 + d.getYear();
                    // LINEAR graphic
                    if (vm.selected_year == income.year.toString()) {
                        var categ_index = vm.labelsLinear.indexOf(income.monthAsString);
                        if (income.defaultCurrencyAmount == null) {
                            vm.dataLinear[0][categ_index] = income.amount + vm.dataLinear[0][categ_index];
                            vm.seriesLinear.push(income.name);
                        } else {
                            vm.dataLinear[0][categ_index] = income.defaultCurrencyAmount + vm.dataLinear[0][categ_index];
                            vm.seriesLinear.push(income.name);
                        }
                    }

                })
            })


        }

        vm.extractMonthAsString = function (monthAsInt, returnSubArray) {
            var monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];
            if (returnSubArray) {
                return monthStrings.splice(0, monthAsInt + 1);
            }
            return monthStrings[monthAsInt];

        }

        /**
        * Used to generate an array with the specified length filled with zeroes.
        */
        vm.generateZeroesArray = function (length) {
            var zeroesArray = [];
            var index;
            for (index = 0; index < length; index++) {
                zeroesArray.push(0);
            }
            return zeroesArray;
        }

        /**
        * Used to generate arrays based on the specified arrays number.
        * The function returns an array of arrays, each array containing the number 0.
        */
        vm.generateArraysWithZero = function (numberOfArrays) {
            var arrayOfArrays = [];
            var index;
            for (index = 0; index < numberOfArrays; index++) {
                arrayOfArrays.push([0]);
            }
            return arrayOfArrays;
        }

        /**
        * Returns an array with tha last 5 years.
        */
        vm.intializeYearsArray = function () {
            var currentYear = 1900 + new Date().getYear();
            var yearsArray = [
                (currentYear - 4).toString(),
                (currentYear - 3).toString(),
                (currentYear - 2).toString(),
                (currentYear - 1).toString(),
                currentYear.toString()];
            return yearsArray;
        }

        //income data
        vm.incomes = [];
        vm.yearsArray = vm.intializeYearsArray();
        vm.selected_year = (1900 + (new Date().getYear())).toString();

        vm.updateExpenses();
        vm.updateIncomes();
        vm.updateIncomesVsExpensesChart();

        vm.showStatInfo = function(){

          var alertPopup = $ionicPopup.alert({
             title: 'Attention!',
             template: 'All expenses and incomes are converted to your default currency based on their creation date. <br></b> <b>Data may not be exact! </b>',
             buttons: [
                   {
                     text: '<b>Ok</b>',
                     type: 'button-dark',
                   }
                 ]
          });
        }

    }
})();
