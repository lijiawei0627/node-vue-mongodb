(function(e){function n(n){for(var r,o,a=n[0],i=n[1],f=n[2],s=0,l=[];s<a.length;s++)o=a[s],c[o]&&l.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);h&&h(n);while(l.length)l.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,o=1;o<t.length;o++){var a=t[o];0!==c[a]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},c={app:0},u=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-132e710e":"89bf9bea","chunk-26ed9ebc":"3eaaa903","chunk-43ae0c49":"95061211","chunk-45b65299":"82ccbadd","chunk-57c51ae3":"2ede89a5","chunk-6b1e1ba6":"a6bf847c","chunk-76f51f16":"2bbc4ab7","chunk-f9c552bc":"6ca2d738"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-132e710e":1,"chunk-26ed9ebc":1,"chunk-43ae0c49":1,"chunk-45b65299":1,"chunk-57c51ae3":1,"chunk-6b1e1ba6":1,"chunk-76f51f16":1,"chunk-f9c552bc":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-132e710e":"7caba1c1","chunk-26ed9ebc":"7a629784","chunk-43ae0c49":"190772b7","chunk-45b65299":"5211aad4","chunk-57c51ae3":"c1e9152f","chunk-6b1e1ba6":"372ce7ee","chunk-76f51f16":"eedce807","chunk-f9c552bc":"35446c33"}[e]+".css",c=i.p+r,u=document.getElementsByTagName("link"),a=0;a<u.length;a++){var f=u[a],s=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(s===r||s===c))return n()}var l=document.getElementsByTagName("style");for(a=0;a<l.length;a++){f=l[a],s=f.getAttribute("data-href");if(s===r||s===c)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var r=n&&n.target&&n.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],h.parentNode.removeChild(h),t(u)},h.href=c;var d=document.getElementsByTagName("head")[0];d.appendChild(h)}).then(function(){o[e]=0}));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise(function(n,t){r=c[e]=[n,t]});n.push(r[2]=u);var f,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=a(e),f=function(n){s.onerror=s.onload=null,clearTimeout(l);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,u=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");u.type=r,u.request=o,t[1](u)}c[e]=void 0}};var l=setTimeout(function(){f({type:"timeout",target:s})},12e4);s.onerror=s.onload=f,document.head.appendChild(s)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],s=f.push.bind(f);f.push=n,f=f.slice();for(var l=0;l<f.length;l++)n(f[l]);var h=s;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("64a9"),o=t.n(r);o.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},c=[],u=(t("ac6a"),t("456d"),t("7618")),a=t("04e1"),i=t.n(a),f={name:"App",components:{},created:function(){var e=i()(localStorage.Token);this.$store.dispatch("setAuthenticated",!this.isEmpty(e)),this.$store.dispatch("setUser",e)},methods:{isEmpty:function(e){return void 0===e||null===e||"object"===Object(u["a"])(e)&&0===Object.keys(e).length||"string"===typeof e&&0===e.trim().length}}},s=f,l=(t("034f"),t("2877")),h=Object(l["a"])(s,o,c,!1,null,null,null),d=h.exports,p=t("bc3a"),b=t.n(p),m=t("5c96"),g=t.n(m),k=t("8c4f"),v=[{path:"/",redirect:"/index",component:function(){return t.e("chunk-76f51f16").then(t.bind(null,"d504"))}},{path:"/index",component:function(){return t.e("chunk-76f51f16").then(t.bind(null,"d504"))},children:[{path:"",component:function(){return t.e("chunk-f9c552bc").then(t.bind(null,"bb51"))}},{path:"/home",name:"Home",component:function(){return t.e("chunk-f9c552bc").then(t.bind(null,"bb51"))}},{path:"/infoshow",name:"Infoshow",component:function(){return t.e("chunk-26ed9ebc").then(t.bind(null,"543c"))}},{path:"/fundlist",name:"FundList",component:function(){return t.e("chunk-57c51ae3").then(t.bind(null,"f29b"))}},{path:"/management",name:"Management",component:function(){return t.e("chunk-6b1e1ba6").then(t.bind(null,"f15f"))}}]},{path:"/register",name:"Register",component:function(){return t.e("chunk-43ae0c49").then(t.bind(null,"73cf"))}},{path:"/login",name:"Login",component:function(){return t.e("chunk-132e710e").then(t.bind(null,"a55b"))}},{path:"*",name:"404",component:function(){return t.e("chunk-45b65299").then(t.bind(null,"8cdb"))}}];r["default"].use(k["a"]);var T=new k["a"]({routes:v,mode:"history"});T.beforeEach(function(e,n,t){var r=!!localStorage.Token;"/login"==e.path||"/register"==e.path?t():r?t():t("/login")});var E,y=T,S=void 0;function A(){E=m["Loading"].service({lock:!0,text:"拼命加载中",background:"rgba(0, 0, 0, 0.7)"})}function w(){E.close()}b.a.interceptors.request.use(function(e){return A(),localStorage.Token&&(e.headers.Authorization=localStorage.Token),e},function(e){return Promise.reject(e)}),b.a.interceptors.response.use(function(e){w();var n=e.data.status;return 401==n&&(S.$message({type:"warning",message:"Token失效，请重新登录"}),localStorage.removeItem("Token"),y.push("/login")),e},function(e){w(),m["Message"].error("Token失效，请重新登录")});var _,j=b.a,O=t("2f62"),U={isAuthenticated:!1,user:{}},x=U,C=t("bd86"),N={SET_AUTHENTICATED:"SET_AUTHENTICATED",SET_USER:"SET_USER"},P=N,I=(_={},Object(C["a"])(_,P.SET_AUTHENTICATED,function(e,n){e.isAuthenticated=n||!1}),Object(C["a"])(_,P.SET_USER,function(e,n){e.user=n||{}}),_),D=I,H={setAuthenticated:function(e,n){var t=e.commit;t(P.SET_AUTHENTICATED,n)},setUser:function(e,n){var t=e.commit;t(P.SET_USER,n)},clearCurrentState:function(e){var n=e.commit;n(P.SET_AUTHENTICATED,!1),n(P.SET_USER,null)}},L=H,M={isAuthenticated:function(e){return e.isAuthenticated},user:function(e){return e.user}},R=M;r["default"].use(O["a"]);var $=new O["a"].Store({strict:!1,state:x,mutations:D,actions:L,getters:R});t("0fae"),t("fd38");r["default"].config.productionTip=!1,r["default"].use(g.a),r["default"].prototype.$axios=j,new r["default"]({router:y,store:$,render:function(e){return e(d)}}).$mount("#app")},"64a9":function(e,n,t){},fd38:function(e,n,t){}});
//# sourceMappingURL=app.969e6731.js.map