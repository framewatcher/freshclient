!function(){"use strict";angular.module("formioApp",["ngSanitize","ui.router","ui.bootstrap","ui.bootstrap.accordion","ui.bootstrap.alert","ngFormBuilder","ngFormioHelper","ngFormBuilderHelper","bgf.paginateAnything","formio","ngMap"])}(),function(){"use strict";angular.module("formioApp").run(["$rootScope","AppConfig","FormioAuth",function(e,t,r){r.init(),angular.forEach(t.forms,function(t,r){e[r]=t})}])}(),function(){"use strict";function e(e,t,r,o){e.state("home",{url:"/",templateUrl:"views/main.html",controller:["$scope",function(e){e.searchTypes=[{name:"name",title:"Name"},{name:"title",title:"Title"},{name:"tags",title:"Tags"}],e.resources=[],e.resourcesUrl=r.appUrl+"/form?type=resource",e.resourcesUrlParams={},e.resourcesLoading=!0,e.resourcesSearch="",e.resourcesSearchType="name",e.forms=[],e.formsUrl=r.appUrl+"/form?type=form",e.formsUrlParams={},e.formsLoading=!0,e.formsSearch="",e.formsSearchType="name",e.formsPerPage=5,e.$on("pagination:loadPage",function(t,r,o){-1!==o.url.indexOf("type=resource")&&(e.resourcesLoading=!1),-1!==o.url.indexOf("type=form")&&(e.formsLoading=!1)}),e.updateResourceSearch=function(){var t={};if(e.resourcesSearch.length>0){var r=e.resourcesSearchType+"__regex";t[r]="/"+e.resourcesSearch+"/i"}e.resourcesUrlParams=t},e.updateFormSearch=function(){var t={};if(e.formsSearch.length>0){var r=e.formsSearchType+"__regex";t[r]="/"+e.formsSearch+"/i"}e.formsUrlParams=t}}]}),e.state("userprofile",{url:"/userprofile",templateUrl:"views/user/userprofile.html",controller:["$scope","$rootScope",function(e,t){e.myname=t.user._id}]}),e.state("vendorlist",{url:"/",templateUrl:"views/user/vendor.html",controller:["$scope","$rootScope",function(e,t){e.myuid=t.user._id}]}),e.state("vendorview",{url:"/vendorview",templateUrl:"views/user/vendorview.html",controller:["$scope","$rootScope","$http","Formio",function(e,t,r,o){e.myuid=t.user._id,r.get("http://localhost:3001/vendor/submission",{headers:{"x-jwt-token":o.getToken()}}).then(function(t){e.getvendorlist=t.data})}]}),e.state("irfview",{url:"/irfview",templateUrl:"views/irf/irfview.html",controller:["$scope","$rootScope","$http","Formio",function(e,t,r,o){e.myuid=t.user._id,r.get("http://localhost:3001/irf/submission",{headers:{"x-jwt-token":o.getToken()}}).then(function(t){e.getirflist=t.data})}]}),e.state("irfadd",{url:"/irfadd",templateUrl:"views/irf/irfadd.html",controller:["$scope","$rootScope",function(e,t){e.myuid=t.user._id}]}),e.state("qtview",{url:"/qtview",templateUrl:"views/qt/quotationview.html",controller:["$scope","$rootScope","$http","Formio",function(e,t,r,o){e.myuid=t.user._id;var i=[];r.get("http://localhost:3001/irf/submission",{headers:{"x-jwt-token":o.getToken()}}).then(function(t){e.getirflist=t.data;for(var r=t.data,o=0;o<r.length;o++){i.push(r[o].data);var s="_id",n=r[o]._id;i[o][s]=n}}),r.get("http://localhost:3001/quotationItem/submission",{headers:{"x-jwt-token":o.getToken()}}).then(function(t){e.quotationItemlist=t.data;t.data}),r.get("http://localhost:3001/qtitemreply/submission",{headers:{"x-jwt-token":o.getToken()}}).then(function(t){e.quotationitemreplylist=t.data}),e.gmyarray=i,e.showirfitem=function(){e.showirfitemlist="one"}}]}),e.state("qtitemadd",{url:"/qtitemadd",templateUrl:"views/qt/quotationitemadd.html",controller:["$scope","$rootScope","$http","Formio",function(e,t,r,o){e.myuid=t.user._id}]}),e.state("qtitemreplyadd",{url:"/qtitemreplyadd",templateUrl:"views/qt/qtitemreplyadd.html",controller:["$scope","$rootScope",function(e,t){e.myuid=t.user._id}]}),e.state("viewvendorlist",{url:"/viewvendorlist",templateUrl:"/irf/submission/61dd21a1f3b0365149792801",controller:["$scope","$rootScope",function(e,t){e.myuid=t.user._id}]}),o.register("",r.appUrl,{}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","AppConfig","FormioFormBuilderProvider"],angular.module("formioApp").config(e)}(),function(){"use strict";angular.module("formioApp").constant("moment",moment)}(),function(){"use strict";angular.module("formioApp").config(["AppConfig","FormioProvider","FormioAuthProvider","$locationProvider",function(e,t,r,o){o.hashPrefix(""),t.setAppUrl(e.appUrl),t.setApiUrl(e.apiUrl),r.setForceAuth(!0),r.setStates("auth.login","home"),r.register("login","user","login")}])}();