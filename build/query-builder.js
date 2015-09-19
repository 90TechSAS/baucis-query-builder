'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var QueryBuilder = (function () {
    function QueryBuilder($http, path) {
        _classCallCheck(this, QueryBuilder);

        this.$http = $http;
        this.path = path;
        this.options = {};
    }

    _createClass(QueryBuilder, [{
        key: '_setQuery',
        value: function _setQuery(query) {
            this.options.conditions = this.options.conditions || [];
            var queryObject = _.find(this.options.conditions, function (elt) {
                return !elt.path;
            });
            if (!queryObject) {
                queryObject = {};
                this.options.conditions.push(queryObject);
            }
            _.merge(queryObject, query);
        }
    }, {
        key: 'setPath',
        value: function setPath(path) {
            this.path = this.path + path;
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            return this.path;
        }
    }, {
        key: 'paginate',
        value: function paginate(pagination) {
            if (pagination) {
                this.options = _.merge(this.options, pagination);
            }
            return this;
        }
    }, {
        key: 'populate',
        value: function populate(populateArray) {
            if (populateArray) {
                this.options.populate = JSON.stringify(populateArray);
            }
            return this;
        }
    }, {
        key: 'select',
        value: function select(key, ids) {
            var k = key || '_id';
            if (ids && ids.length) {
                var obj = {};
                obj[k] = { $in: ids };
                _setQuery(obj);
            }
            return this;
        }
    }, {
        key: 'sort',
        value: function sort(sortField) {
            if (sortField) {
                this.options = _.merge(this.options, { sort: sortField });
            }
            return this;
        }
    }, {
        key: 'get',
        value: function get() {
            return this.$http.get(this.path, { params: this.options });
        }
    }, {
        key: 'echo',
        value: function echo() {
            console.info(this.options);
        }
    }]);

    return QueryBuilder;
})();

var ZlQueryBuilderProvider = (function () {
    function ZlQueryBuilderProvider() {
        _classCallCheck(this, ZlQueryBuilderProvider);

        this.rootApiPath = '';
        console.info(this);
    }

    _createClass(ZlQueryBuilderProvider, [{
        key: 'setRootApiPath',
        value: function setRootApiPath(path) {
            this.rootApiPath = path;
        }
    }, {
        key: '$get',
        value: function $get($http) {
            var self = this;
            return {
                get: function get(path) {
                    console.info('get');
                    return new QueryBuilder($http, self.rootApiPath + path);
                }
            };
            //   return new QueryBuilder($http, this.rootApiPath);
        }
    }]);

    return ZlQueryBuilderProvider;
})();

angular.module('90TechSAS.baucis-query-builder', []).provider('zlQueryBuilder', ZlQueryBuilderProvider);