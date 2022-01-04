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
        url: '/vendorlist',
        templateUrl: 'views/user/vendor.html',
        controller: ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
          $scope.myuid = $rootScope.user._id;
          // $http.get('http://localhost:3001/#/viewvendorlist', {headers: {'x-jwt-token': Formio.getToken()} }).then(function(result){ $scope.getvendorlist = JSON.stringify(result.data); alert(result); });
        }]
      });

      $stateProvider
      .state('vendorview', {
        url: '/vendorview',
        templateUrl: 'views/user/vendorview.html',
        controller: ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
          $scope.myuid = $rootScope.user._id;

      });

      $stateProvider
      .state('viewvendorlist', {
        url: '/viewvendorlist',
        templateUrl: '/vendor/submission',
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
