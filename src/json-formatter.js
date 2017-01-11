/*!
 * jsonformatter
 *
 * Version: 0.4.1 - 2015-12-03T03:38:59.925Z
 * License: MIT
 */

'use strict';

var JSONFormatter = require('json-formatter-js');

//(function() { // IIFE

angular.module('jsonFormatter', [ ])
    .directive('jsonFormatter', jsonFormatterDirective);

function jsonFormatterDirective() {

    // http://stackoverflow.com/questions/13523951/how-to-check-the-depth-of-an-object
    function _depthOf(obj) {

        var depth;
        var level = 1;
        var key;

        if ( !angular.isObject(obj) ) {
            return level;
        }

        for ( key in obj ) {
            if ( !obj.hasOwnProperty(key) ) {
                continue;
            }

            if ( angular.isObject(obj[key]) ) {
                depth = _depthOf(obj[key]) + 1;
                level = Math.max(depth, level);
            }
        }
        return level;

    } // _depthOf

    return {
        restrict:   'E',
        replace:    true,
        scope: {
            json:   '=',
            open:   '='
        },
        link: function( scope, elem ) {

            const formatter = new JSONFormatter( scope.json );
            var depth = _depthOf( scope.json );

            function _setDepth() {

                if ( scope.open < 0 ) {
                    scope.open = 0;
                }
                else if ( scope.open > depth ) {
                    scope.open = depth;
                }

                formatter.openAtDepth( scope.open );

            } // _setDepth

            elem.replaceWith( formatter.render() );

            if ( scope.open ) {
                _setDepth();
            }

            scope.$watch('open', function(value) {
                _setDepth();
            }, false);

        } // link
    };
}

//})(); // IIFE
