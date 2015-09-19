/**
 */

'use strict';

angular.module('myApp').service('query2Service', ['zlQueryBuilder', function(zlQueryBuilder){


    var qb = zlQueryBuilder.get();
    qb.setPath('/query2') ;
    console.info(qb);

}]);