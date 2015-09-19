# baucis-query-builder

Easily Build complex requests

## Usage
 **Care with current version! Still WIP...**
- Import the module in your angular app.
- Set the root url:
    
    ```javascript
        myApp.config(['zlQueryBuilderProvider', function(zlQueryBuilderProvider){
            zlQueryBuilderProvider.setRootApiPath('htp://myApi.com/');
        }]);
    ```
- Define your services with specific paths
    
    ```javascript
        myApp.service('resource', [function(zlQueryBuilder){
            this.queryBuilder = zlQueryBuilder.get('resourcePath');
        }])
    ```
- Use the queryBuilder anywhere (directly in the service or in the controllers)
    
     ```javascript
        qb
            .paginate(myPaginationObject)
            .sort('field')
            .populate([{path: 'subObject1'}, {path: 'subObject2'])
    ```