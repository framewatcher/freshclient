!function(){"use strict";angular.module("formioApp",["ngSanitize","ui.router","ui.bootstrap","ui.bootstrap.accordion","ui.bootstrap.alert","ngFormBuilder","ngFormioHelper","ngFormBuilderHelper","bgf.paginateAnything","formio","ngMap"])}(),function(){"use strict";angular.module("formioApp").run(["$rootScope","AppConfig","FormioAuth",function(e,r,o){o.init(),angular.forEach(r.forms,function(r,o){e[o]=r})}])}(),function(){"use strict";function e(e,r,o,t){e.state("home",{url:"/",templateUrl:"views/main.html",controller:["$scope",function(e){e.searchTypes=[{name:"name",title:"Name"},{name:"title",title:"Title"},{name:"tags",title:"Tags"}],e.resources=[],e.resourcesUrl=o.appUrl+"/form?type=resource",e.resourcesUrlParams={},e.resourcesLoading=!0,e.resourcesSearch="",e.resourcesSearchType="name",e.forms=[],e.formsUrl=o.appUrl+"/form?type=form",e.formsUrlParams={},e.formsLoading=!0,e.formsSearch="",e.formsSearchType="name",e.formsPerPage=5,e.$on("pagination:loadPage",function(r,o,t){-1!==t.url.indexOf("type=resource")&&(e.resourcesLoading=!1),-1!==t.url.indexOf("type=form")&&(e.formsLoading=!1)}),e.updateResourceSearch=function(){var r={};if(e.resourcesSearch.length>0){var o=e.resourcesSearchType+"__regex";r[o]="/"+e.resourcesSearch+"/i"}e.resourcesUrlParams=r},e.updateFormSearch=function(){var r={};if(e.formsSearch.length>0){var o=e.formsSearchType+"__regex";r[o]="/"+e.formsSearch+"/i"}e.formsUrlParams=r}}]}),e.state("userprofile",{url:"/userprofile",templateUrl:"views/user/userprofile.html",controller:["$scope","$rootScope",function(e,r){e.myname=r.user._id}]}),e.state("vendorlist",{url:"/vendorlist",templateUrl:"views/user/vendor.html",controller:["$scope","$rootScope",function(e,r){e.myuid=r.user._id}]}),e.state("vendorview",{url:"/vendorview",templateUrl:"views/user/vendorview.html",controller:["$scope","$rootScope","$http","Formio",function(e,r,o,t){e.myuid=r.user._id,o.get("http://localhost:3001/vendor/submission",{headers:{"x-jwt-token":t.getToken()}}).then(function(r){e.getvendorlist=r.data})}]}),e.state("vendorview",{url:"/vendorview",templateUrl:"views/user/vendorview.html",controller:["$scope","$rootScope","$http","Formio",function(e,r,o,t){e.myuid=r.user._id,o.get("http://localhost:3001/vendor/submission",{headers:{"x-jwt-token":t.getToken()}}).then(function(r){e.getvendorlist=r.data})}]}),e.state("viewvendorlist",{url:"/viewvendorlist",templateUrl:"/vendor/submission",controller:["$scope","$rootScope",function(e,r){e.myuid=r.user._id}]}),t.register("",o.appUrl,{}),r.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","AppConfig","FormioFormBuilderProvider"],angular.module("formioApp").config(e)}(),function(){"use strict";angular.module("formioApp").constant("moment",moment)}(),function(){"use strict";angular.module("formioApp").config(["AppConfig","FormioProvider","FormioAuthProvider","$locationProvider",function(e,r,o,t){t.hashPrefix(""),r.setAppUrl(e.appUrl),r.setApiUrl(e.apiUrl),o.setForceAuth(!0),o.setStates("auth.login","home"),o.register("login","user","login")}])}();