'use strict';

angular.
  module('followersList').
  component('followersList', {
    templateUrl: 'followers-list/followers-list.template.html',
    controller: ['DataService', '$scope',
      function (DataService, $scope) {
        const vm = this;

        vm.totalData = [];
        vm.filteredData = [];
        vm.dateRange = null;
        vm.orderProp = '';
        vm.sortReverse = false;
        vm.itemToRemove = null;
        vm.isChirpinessDisabled = 0;

        vm.$onInit = function() {
          DataService.loadData().then(data => {
            vm.totalData = data;
            vm.filteredData = data;
          }).catch(error => {
            console.error('Error fetching data:', error);
          });
        };

        vm.handleSortChange = function(orderProp, sortReverse) {
          vm.orderProp = orderProp;
          vm.sortReverse = sortReverse;
        };

        vm.calculateMonthDifference = function(dateRange) {
          const differenceInTime = dateRange.end - dateRange.start;
          const millisecondsInAMonth = 1000 * 60 * 60 * 24 * 30;
          const monthsDifference = Math.floor(differenceInTime / millisecondsInAMonth);
          vm.isChirpinessDisabled = monthsDifference > 6;
        }

        vm.handleDateRangeChange = function(dateRange) {
          vm.dateRange = dateRange;
          vm.calculateMonthDifference(dateRange);
          vm.filteredData = vm.totalData.filter(data => data.join_date >= dateRange.start && data.join_date <= dateRange.end)
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        };

        vm.toggleSort = function(prop) {
          if (vm.orderProp === prop) {
            vm.sortReverse = !vm.sortReverse;
          } else {
            vm.orderProp = prop;
            vm.sortReverse = false;
          }
        };
  
        vm.openModal = function(item) {
          vm.itemToRemove = item;
          var modalElement = document.getElementById('confirmRemoveModal');
          var modalInstance = new bootstrap.Modal(modalElement);
          modalInstance.show();
        };
  
        vm.confirmRemove = function() {
          var index = vm.filteredData.indexOf(vm.itemToRemove);
          if (index !== -1) {
            vm.totalData.splice(index, 1);
          }
  
          var modalElement = document.getElementById('confirmRemoveModal');
          var modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        };   
      }
    ]
  });
