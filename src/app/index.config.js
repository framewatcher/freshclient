(function() {
  'use strict';
  angular
  .module('formioApp')
  .config([
    'AppConfig',
    'FormioProvider',
    'FormioAuthProvider',
    'FormioResource',
    '$locationProvider',
    function(
      AppConfig,
      FormioProvider,
      FormioAuthProvider,
      FormioResource,
      $locationProvider
    ) {
      $locationProvider.hashPrefix('');
      FormioProvider.setAppUrl(AppConfig.appUrl);
      FormioProvider.setApiUrl(AppConfig.apiUrl);
      FormioAuthProvider.setForceAuth(true);
      FormioAuthProvider.setStates('auth.login', 'home');
      FormioAuthProvider.register('login', 'user', 'login');
      FormioResource.register('vendor', 'http://localhost:3001/vendor');

    }
  ]);
})();
