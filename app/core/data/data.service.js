'use strict';

angular.module('core.data')
  .service('DataService', ['$http', '$q', function($http, $q) {
    var items = [];
    var $scope = this;

    // Fetch data from the API
    this.fetchDataFromAPI = function() {
        var deferred = $q.defer();

        $http.get(`https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e
313922a5ccce7f38e17f790ac/twubric.json`)
            .then(function(response) {
                items = response.data;
                deferred.resolve(items);
            })
            .catch(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    // Fetch data from the local JSON file
    this.fetchDataFromFile = function() {
        return $http.get('http://localhost:3000/getData');
    };

    this.getItems = function() {
        return items;
    };

    this.addItem = function(item) {
        items.push(item);
    };

    this.removeItem = function(index) {
        items.splice(index, 1);
    };

    this.saveData = function(data) {
        return $http.post('http://localhost:3000/saveData', data);
    };

    this.loadData = function() {
        var deferred = $q.defer();

        this.fetchDataFromFile().then(function(response) {
            if (response.data.length > 0) {
                console.log("fetching from data.json file")
                items = response.data;
                deferred.resolve(items);
            } else {
                return this.fetchDataFromAPI().then(function(apiData) {
                    items = apiData;
                    console.log("fetching from api")
                    $scope.saveData(items);
                    deferred.resolve(items);
                });
            }
        }.bind(this)).catch(function(error) {
            console.error('Error fetching data from file:', error);
            return this.fetchDataFromAPI().then(function(apiData) {
                items = apiData;
                deferred.resolve(items);
            });
        }.bind(this));

        return deferred.promise;
    };
  }]);
