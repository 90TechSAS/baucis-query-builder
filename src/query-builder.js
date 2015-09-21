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
            var _populateArray = populateArray;
            if (!_.isArray(_populateArray)){
                _populateArray = [populateArray];
            }
            _populateArray        = _.map(_populateArray, function(populate){
                if (typeof populate === 'string'){
                    return {path: populate}
                }
                return populate
            });
            this.options.populate = JSON.stringify(_populateArray);
        }
        return this;
    }

    select(ids, key){
        var k = key || '_id';
        if (ids && ids.length){
            var obj = {};
            obj[k]  = {$in: ids};
            this._setQuery(obj);
        }
        return this;
    }

    sort(sortField){
        if (sortField){
            this.options = _.merge(this.options, {sort: sortField});
        }
        return this;
    }

    get(keep){
        var _options = _.cloneDeep(this.options);
        if (!keep){
            this.flush();
        }
        return this.$http.get(this.path, {params: _options})
    }

    flush(){
        this.options = {};
        return this;
    }

    echo(){
        console.log(this.options);
    }


}

class ZlQueryBuilderProvider {

    constructor(){
        this.rootApiPath = '';
    }


    setRootApiPath(path){
        this.rootApiPath = path;
    }

    $get($http){
        var self = this;
        return {
            get: function(path){
                return new QueryBuilder($http, self.rootApiPath + path);
            }
        };
    }

}

angular.module('90TechSAS.baucis-query-builder', [])
    .provider('zlQueryBuilder', ZlQueryBuilderProvider);