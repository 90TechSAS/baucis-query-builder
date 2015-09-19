/**
 @toc
 1. setup - whitelist, appPath, html5Mode
 */

'use strict';

var app = angular.module('myApp', [
    'ngRoute', 'ngSanitize', 'ngTouch',		//additional angular modules
    '90TechSAS.baucis-query-builder'
])


    app.config(['$routeProvider', '$locationProvider', '$compileProvider', ($routeProvider, $locationProvider) => {
        /**
         setup - whitelist, appPath, html5Mode
         @toc 1.
         */
        $locationProvider.html5Mode(false);		//can't use this with github pages / if don't have access to the server

        // var staticPath ='/';
        var staticPath;
        // staticPath ='/angular-services/baucis-query-builder/';		//local
        staticPath = '/';		//nodejs (local)
        // staticPath ='/baucis-query-builder/';		//gh-pages
        var appPathRoute = '/';
        var pagesPath    = staticPath + 'pages/';


        $routeProvider.when(appPathRoute + 'home', {templateUrl: pagesPath + 'home/home.html'});

        $routeProvider.otherwise({redirectTo: appPathRoute + 'home'});

    }]);

app.config((zlQueryBuilderProvider)=>{
        console.info('zlquery: ' , zlQueryBuilderProvider);
        zlQueryBuilderProvider.setRootApiPath('localhost');

});