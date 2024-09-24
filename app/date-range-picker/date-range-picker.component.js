angular.module('dateRangePicker', [])
  .component('dateRangePicker', {
    bindings: {
        onDateRangeChange: '&'
    },
    templateUrl: 'date-range-picker/date-range-picker.template.html',
    controller: ['$element', '$scope', function($element, $scope) {
      const vm = this;

      vm.$onInit = function() {
        flatpickr($element[0].querySelector("#dateRange"), {
            maxDate: new Date(),
            mode: "range",
            dateFormat: "d-M-y",
            onChange: function(selectedDates) {
              if (selectedDates.length === 2) {
                const start = new Date(selectedDates[0]).getTime();
                const end = new Date(selectedDates[1]).getTime();
                
                vm.onDateRangeChange({ dateRange: { start, end } });
              }
            }
        });
      };
    }]
  });
