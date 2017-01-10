var app = angular.module('demo', ['ngSanitize', 'jsonFormatter']);

app.controller('MainCtrl', function ($scope, $http, JSONFormatterConfig) {

  $scope.hoverPreviewEnabled = JSONFormatterConfig.hoverPreviewEnabled;
  $scope.hoverPreviewArrayCount = JSONFormatterConfig.hoverPreviewArrayCount;
  $scope.hoverPreviewFieldCount = JSONFormatterConfig.hoverPreviewFieldCount;

  $scope.$watch('hoverPreviewEnabled', function(newValue){
    JSONFormatterConfig.hoverPreviewEnabled = newValue;
  });
  $scope.$watch('hoverPreviewArrayCount', function(newValue){
    JSONFormatterConfig.hoverPreviewArrayCount = newValue;
  });
  $scope.$watch('hoverPreviewFieldCount', function(newValue){
    JSONFormatterConfig.hoverPreviewFieldCount = newValue;
  });

  ////http://stackoverflow.com/questions/13523951/how-to-check-the-depth-of-an-object
  function depthOf( obj ) {

    var level = 1;
    var key;

    if (!angular.isObject( obj )) {
        return level;
    }

    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        if (angular.isObject( obj[key] )) {
            var depth = depthOf(obj[key]) + 1;
            level = Math.max(depth, level);
        }
    }
    return level;
  } // depthOf

  $scope.iLevels = 1;
  $scope.testObj = { lvl0: { num: 12, lvl1: { lvl2: { lvl3: { lvl4: { lvl5: { lvl6: { lvl7: { lvl8: { lvl9: { lvl10: { lvl11: { lvl12: { end:true } } } } } } } } } } } } } };
  $scope.testObjDepth = depthOf($scope.testObj);
  $scope.incLevel = function() {
      $scope.iLevels++;
      if ($scope.iLevels > $scope.testObjDepth) {
        $scope.iLevels = $scope.testObjDepth;
      }
  }
  $scope.decLevel = function() {
      $scope.iLevels--;
      if ($scope.iLevels < 0) {
        $scope.iLevels = 0;
      }
  }

  $scope.undef = undefined;
  $scope.textarea = '{}';
  $scope.complex = {
    numbers: [
      1,
      2,
      3
    ],
    boolean: true,
    'null': null,
    number: 123,
    anObject: {
      a: 'b',
      c: 'd',
      e: 'f\"'
    },
    string: 'Hello World',
    url: 'https://github.com/mohsen1/json-formatter',
    date: 'Sun Aug 03 2014 20:46:55 GMT-0700 (PDT)',
    func: function add(a,b){return a + b; }
  };

  $scope.randArray1 = [null, null, null].map(function(r) {
    return {value: Math.random()};
  });

  $scope.randArray2 = [null, null, null].map(function(r) {
    return {value: Math.random()};
  });

  $scope.deep = {a:{b:{c:{d:{}}}}};

  $scope.fn = function fn(arg1, /*arg*/arg2) {
    return arg1 + arg2;
  };

  $scope.alternate1 = {o: 1, d: 'Alternate 1', b: []};
  $scope.alternate2 = [1, 'Alternate 2', {b: {}}];

  $scope.fetchGiantJSON = function() {
    $scope.giant = 'Fetching...';
    $http.get('giant.json').then(function (json) {
      $scope.giant = json;
    });
  }

  function Person(name){ this.name = name; }
  $scope.person = new Person('Mohsen');

  $scope.$watch('textarea', function (str){
    var result = {};

    try {
        $scope.textareaJson = JSON.parse(str);
    } catch (e) {}
  });
});
