webpackJsonp([0],{1259:function(e,t,r){"use strict";function n(e){r(1277)}Object.defineProperty(t,"__esModule",{value:!0});var s=r(1265),i=r(1279),a=r(0),o=n,u=Object(a.a)(s.a,i.a,i.b,!1,o,null,null);t.default=u.exports},1265:function(e,t,r){"use strict";var n=r(1),s=r(3);t.a={mixins:[n.a],components:{},name:"speed",props:[],data:function(){return{sites:[]}},computed:{sortedSites:function(){return this.sites.sort(function(e,t){return e.speed-t.speed})}},created:function(){},methods:{__getNewEnableLines:function(){this.getNewEnableLines()},getNewEnableLines:function(){var e=this;this.$.get(s.a.getNewEnableLines).then(function(t){var r=t.data.frontList;e.sites=Array(r.length).fill(0).map(function(e,t){return{url:r[t].line,speed:2e3,squares:2}}),e.getSpeed()})},getSpeed:function(e){var t=this;this.sites.forEach(function(e,r){var n=document.createElement("script"),s=Date.now();n.setAttribute("src",e.url+"/dscagamesclient/login/lineTest.do?method=lineTest"),n.onload=function(){e.speed=Date.now()-s,e.squares=t.getSquares(e.speed)},n.onerror=function(){},t.$el.appendChild(n)})},getColors:function(e){if(e){if(e<5)return"red";if(e<10)return"orange";if(e<15)return"green";if(e<20)return"blue"}return"red"},getSquares:function(e){if(e){if(e<50)return 19;if(e<100)return 17;if(e<200)return 15;if(e<300)return 13;if(e<400)return 11;if(e<500)return 9;if(e<700)return 7;if(e<900)return 5;if(e<1e3)return 3;if(e<2e3)return 2;if(e<5e3)return 1}return 0}}}},1277:function(e,t,r){var n=r(1278);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(1253)("505bae55",n,!0,{})},1278:function(e,t,r){t=e.exports=r(1252)(!1),t.push([e.i,".speed .tag{position:absolute;top:0;left:0;height:40px;line-height:40px;width:100px;-webkit-transform:rotate(-45deg) translateX(-20px) translateY(-25px);transform:rotate(-45deg) translateX(-20px) translateY(-25px)}",""])},1279:function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r.d(t,"b",function(){return s});var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("f7-page",{staticClass:"speed bg-color-deeporange"},[r("f7-navbar",{attrs:{innerClass:"navbar_of_"+e.$options.name}},[r("f7-nav-left",[r("f7-link",{attrs:{text:"取消",color:"gray","popup-close":"#speed"}})],1),r("f7-nav-title",[e._v("线路切换")])],1),e._l(e.sortedSites,function(t,n){return r("div",{key:t.url,staticClass:"mg_15 pd_20 bg-color-white r_10 p_r o_h",class:{current:e.window.location.origin===t.url},on:{click:function(r){e.window.location.href=t.url}}},[n?e._e():r("div",{staticClass:"tag bg-color-red t_c"},[e._v("推荐")]),r("div",{staticClass:"t_r"},[e._v(e._s(t.speed)+"ms")]),r("div",{staticClass:"t_r"},[r("span",{staticClass:"pr_10 inlb v_m"},[e._v("线路"+e._s(n+1))]),r("f7-progressbar",{staticClass:"wp_80 inlb h_10",attrs:{progress:5*t.squares,color:e.getColors(t.squares)}})],1)])})],2)},s=[]}});