(function() {
  'use strict';
  angular
    .module('formioApp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig(
    $stateProvider,
    $urlRouterProvider,
    AppConfig,
    FormioFormBuilderProvider
  ) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: ['$scope', function($scope) {
          $scope.searchTypes = [
            {
              name: 'name',
              title: 'Name'
            },
            {
              name: 'title',
              title: 'Title'
            },
            {
              name: 'tags',
              title: 'Tags'
            }
          ];
          $scope.resources = [];
          $scope.resourcesUrl = AppConfig.appUrl + '/form?type=resource';
          $scope.resourcesUrlParams = {};
          $scope.resourcesLoading = true;
          $scope.resourcesSearch = '';
          $scope.resourcesSearchType = 'name';
          $scope.forms = [];
          $scope.formsUrl = AppConfig.appUrl + '/form?type=form';
          $scope.formsUrlParams = {};
          $scope.formsLoading = true;
          $scope.formsSearch = '';
          $scope.formsSearchType = 'name';
          $scope.formsPerPage = 5;
          $scope.$on('pagination:loadPage', function (event, status, config) {
            if (config.url.indexOf('type=resource') !== -1) {
              $scope.resourcesLoading = false;
            }
            if (config.url.indexOf('type=form') !== -1) {
              $scope.formsLoading = false;
            }
          });
          $scope.updateResourceSearch = function() {
            var params = {};
            if ($scope.resourcesSearch.length > 0) {
              var paramName = $scope.resourcesSearchType+'__regex';
              params[paramName] = '/'+$scope.resourcesSearch+'/i';
            }
            $scope.resourcesUrlParams = params;
          };
          $scope.updateFormSearch = function() {
            var params = {};
            if ($scope.formsSearch.length > 0) {
              var paramName = $scope.formsSearchType+'__regex';
              params[paramName] = '/'+$scope.formsSearch+'/i';
            }
            $scope.formsUrlParams = params;
          };
        }]
      });

      $stateProvider
      .state('userprofile', {
        url: '/userprofile',
        templateUrl: 'views/user/userprofile.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.myname = $rootScope.user._id;
        }]
      });

      $stateProvider
      .state('vendorlist', {
        url: '/',
        templateUrl: 'views/user/vendor.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.myuid = $rootScope.user._id;
        }]
      });

      $stateProvider
      .state('vendorview', {
        url: '/vendorview',
        templateUrl: 'views/user/vendorview.html',
        controller: ['$scope', '$rootScope', '$http', 'Formio', function($scope, $rootScope, $http, Formio) {
          $scope.myuid = $rootScope.user._id;
          $http.get('http://localhost:3001/vendor/submission', {headers: {'x-jwt-token': Formio.getToken()} }).then(function(result){ $scope.getvendorlist = result.data; });
        }]
      });

      $stateProvider
      .state('irfview', {
        url: '/irfview',
        templateUrl: 'views/irf/irfview.html',
        controller: ['$scope', '$rootScope', '$http', 'Formio', function($scope, $rootScope, $http, Formio) {
          $scope.myuid = $rootScope.user._id;
          $http.get('http://localhost:3001/irf/submission', {headers: {'x-jwt-token': Formio.getToken()} }).then(function(result){ $scope.getirflist = result.data; });
        }]
      });

      $stateProvider
      .state('irfadd', {
        url: '/irfadd',
        templateUrl: 'views/irf/irfadd.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.myuid = $rootScope.user._id;
        }]
      });

      $stateProvider
      .state('qtview', {
        url: '/qtview',
        templateUrl: 'views/qt/quotationview.html',
        controller: ['$scope', '$rootScope', '$http', 'Formio', function($scope, $rootScope, $http, Formio) {
          $scope.myuid = $rootScope.user._id;
          var joinirfitem = [];
          $http.get('http://localhost:3001/irf/submission', {headers: {'x-jwt-token': Formio.getToken()} }).then(
            function(result){
              $scope.getirflist = result.data;
              var irfdata = result.data;
              // $scope.gmyarray = irfdata[0]._id;

              for (var y = 0; y < irfdata.length; y++) {
                joinirfitem.push( irfdata[y].data  ) ;
              }

            });
          $http.get('http://localhost:3001/quotationItem/submission', {headers: {'x-jwt-token': Formio.getToken()} }).then(
            function(result){
              $scope.quotationItemlist = result.data;
            });

            $scope.gmyarray = joinirfitem;
        }]
      });

      $stateProvider
      .state('qtitemadd', {
        url: '/qtitemadd',
        templateUrl: 'views/qt/quotationitemadd.html',
        controller: ['$scope', '$rootScope', '$http', 'Formio', function($scope, $rootScope, $http, Formio) {
          $scope.myuid = $rootScope.user._id;
        }]
      });

      $stateProvider
      .state('viewvendorlist', {
        url: '/viewvendorlist',
        templateUrl: '/irf/submission',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.myuid = $rootScope.user._id;
        }]
      });

    // Register the form builder provider.
    FormioFormBuilderProvider.register('', AppConfig.appUrl, {});

    // Register the form routes.
    $urlRouterProvider.otherwise('/');
  }

})();
