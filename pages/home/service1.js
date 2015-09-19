/**
 */

'use strict';

angular.module('myApp').service('query1Service', ['zlQueryBuilder', function(zlQueryBuilder){

    var qb = zlQueryBuilder.get('/query1');
    qb.paginate({skip:10, limit:10})
        .sort('toto')
        .select(['1', '2', '3'])
        .populate(['titi', 'tata', 'toto'])
        .get();
    console.info(qb);


}]);