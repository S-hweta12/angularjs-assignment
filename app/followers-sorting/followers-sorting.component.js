angular.module('followersSorting', [])
  .component('followersSorting', {
    templateUrl: 'followers-sorting/followers-sorting.template.html',
    bindings: {
      onSortChange: '&',
      orderProp: '<',
      sortReverse: '<'
    },
    controller: function() {
      var vm = this;

      vm.toggleSort = function(prop) {
        if (vm.orderProp === prop) {
          vm.sortReverse = !vm.sortReverse;
        } else {
          vm.orderProp = prop;
          vm.sortReverse = false;
        }

        vm.onSortChange({ orderProp: vm.orderProp, sortReverse: vm.sortReverse });
      };
    }
  });