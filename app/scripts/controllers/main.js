'use strict';

/**
 * @ngdoc function
 * @name multilineStringToJavascriptConverterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multilineStringToJavascriptConverterApp
 */
angular.module('multilineStringToJavascriptConverterApp')
  .controller('MainCtrl', function($scope) {
    $scope.variableName = 'string';
    $scope.inputString = '<html>\n<head>\n<title>Hello</title></head>\n<body></body></html>';
    $scope.quoteType = 'single';
    $scope.selectedMethod = 'plusConcat';

    $scope.inputString = '<html>\
   \n  <head>Hello</head> \
   \n  <body class="main" ng-class="{\'my-class\': true}">World</body> \
   \n</html>';

    var methods = {
      plusConcat     : function(string, quote) {
        var lines = prependedLinesWithQuote(string, quote);
        string = lines.join(quote + ' + \n');
        return string + quote;
      },
      arrayJoin      : function(string, quote) {
        var lines = prependedLinesWithQuote(string, quote);
        string = lines.join(quote + ',\n');
        string = '[\n' + string + quote + '\n].join(' + quote + quote + ')';
        return string;
      },
      variableConcat : function(string, quote, variableName) {
        var lines = prependedLinesWithQuote(string, quote);
        var restLines = _.map(_.rest(lines), _.partial(_.add, variableName + ' += '));
        lines = _.take(lines).concat(restLines);
        string = lines.join(quote + ';\n');
        return string + quote;
      },
      splitBackslash : function(string, quote) {
        var lines = getLines(string);
        string = lines.join('\\\n');
        return quote + string + quote;
      }
    };

    $scope.transformInput = function(inputString, selectedMethod, variableName, quoteType) {
      var quote = quoteType === 'single' ? "'" : '"';
      var result = escapeQuotes(inputString, quoteType);
      result = methods[selectedMethod](result, quote, variableName);
      return 'var ' + variableName + ' = ' + result + ';';
    };

    function prependedLinesWithQuote(string, quote) {
      var lines = getLines(string);
      return _.map(lines, _.partial(_.add, quote));
    }

    function getLines(string) {
      return string.split('\n');
    }

    function escapeQuotes(string, quotes) {
      if (quotes === 'single') {
        return string.replace(/'/g, "\\'");
      } else {
        return string.replace(/"/g, '\\"');
      }
    }
  });
