'use strict';


class QueryBuilder {
    constructor($http, path){
        this.$http   = $http;
        this.path    = path;
        this.options = {};
    }

    _setQuery(query){
        this.options.conditions = this.options.conditions || [];
        var queryObject         = _.find(this.options.conditions, function(elt){
            return !elt.path
        });
        if (!queryObject){
            queryObject = {};
            this.options.conditions.push(queryObject);
        }
        _.merge(queryObject, query);
    }

    setPath(path){
        this.path = this.path + path
    }

    getPath(){
        return this.path;
    }

    paginate(pagination){
        if (pagination){
            this.options = _.merge(this.options, pagination);
        }
        return this;
    }

    populate(populateArray){
        if (populateArray){
            this.options.populate = JSON.stringify(populateArray);
        }
        return this;
    }

    select(key, ids){
        var k = key || '_id';
        if (ids && ids.length){
            var obj = {};
            obj[k]  = {$in: ids};
            _setQuery(obj);
        }
        return this;
    }

    sort(sortField){
        if (sortField){
            this.options = _.merge(this.options, {sort: sortField});
        }
        return this;
    }

    get(){
        return this.$http.get(this.path, {params: this.options})
    }

    echo(){
        console.info(this.options);
    }


}

class ZlQueryBuilderProvider {

    constructor(){
        this.rootApiPath = '';
        console.info(this);
    }


    setRootApiPath(path){
        this.rootApiPath = path;
    }

    $get($http){
        var self = this;
        return {
            get: function(path){
                console.info('get');
                return new QueryBuilder($http, self.rootApiPath + path);
            }
        };
        //   return new QueryBuilder($http, this.rootApiPath);
    }

}

angular.module('90TechSAS.baucis-query-builder', [])
    .provider('zlQueryBuilder', ZlQueryBuilderProvider);