webpackJsonp([1],{1238:function(t,e,a){"use strict";function i(t){a(1254)}Object.defineProperty(e,"__esModule",{value:!0});var s=a(1243),o=a(1256),n=a(0),r=i,l=Object(n.a)(s.a,o.a,o.b,!1,r,null,null);e.default=l.exports},1243:function(t,e,a){"use strict";var i=a(1),s=a(3),o=a(103);e.a={mixins:[i.a],components:{},name:"register",props:[],data:function(){return{form:{un:"",pwd:"",pwda:"",tag:"",code:""}}},computed:{pwdlevel:function(){return Object(o.a)(this.form.pwd)}},created:function(){this.__query.tag&&this.getCodeByTag(this.__query.tag)},methods:{getCodeByTag:function(t){var e=this;this.$.get(s.a.getCodeByTag,{tag:t}).then(function(t){var a=t.data.code;e.form.tag=a})},autoRegist:function(){this.$.get(s.a.autoRegist,{userName:this.form.un,passwd:this.form.pwd,verifyCode:this.form.code,promotionCode:this.form.tag}).then(function(){})}}}},1254:function(t,e,a){var i=a(1255);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(1232)("a62bb732",i,!0,{})},1255:function(t,e,a){e=t.exports=a(1231)(!1),e.push([t.i,".register .code{position:absolute;right:15px;top:8px;bottom:0;width:80px}",""])},1256:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{staticClass:"register bg-color-white"},[a("f7-navbar",{attrs:{innerClass:"navbar_of_"+t.$options.name}},[a("f7-nav-left",[a("f7-link",{attrs:{"icon-only":"icon-only","icon-f7":"chevron_left","popup-close":"#register"}})],1),a("f7-nav-title",[t._v("注册")])],1),a("f7-list",{staticClass:"pr_15 mb_5",attrs:{"no-hairlines":"no-hairlines"}},[a("f7-list-input",{attrs:{required:"required",validate:"validate",type:"text",placeholder:"账户","clear-button":"",value:t.form.un},on:{input:function(e){t.form.un=e.target.value}}},[a("f7-icon",{attrs:{slot:"media",f7:"person"},slot:"media"})],1),a("f7-list-input",{attrs:{required:"required",validate:"validate",type:"password",placeholder:"密码","clear-button":"",value:t.form.pwd},on:{input:function(e){t.form.pwd=e.target.value}}},[a("f7-icon",{attrs:{slot:"media",f7:"lock"},slot:"media"})],1),a("f7-list-input",{attrs:{required:"required",validate:"validate",pattern:t.form.pwd,"error-message":"2次密码输入不一至",type:"password",placeholder:"确认密码","clear-button":"",value:t.form.pwda},on:{input:function(e){t.form.pwda=e.target.value}}},[a("f7-icon",{attrs:{slot:"media",f7:"lock_fill"},slot:"media"})],1),a("f7-list-input",{attrs:{required:"required",validate:"validate",type:"text",placeholder:"邀请码","clear-button":"",value:t.form.tag},on:{input:function(e){t.form.tag=e.target.value}}},[a("f7-icon",{attrs:{slot:"media",f7:"email"},slot:"media"})],1),a("li",{staticClass:"item-content item-input"},[a("div",{staticClass:"item-media"},[a("i",{staticClass:"icon f7-icons"},[t._v("check")])]),a("div",{staticClass:"item-inner"},[a("div",{staticClass:"item-input-wrap"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.code,expression:"form.code"}],attrs:{required:"required",validate:"validate",type:"text",placeholder:"验证码"},domProps:{value:t.form.code},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.autoRegist(e)},input:function(e){e.target.composing||t.$set(t.form,"code",e.target.value)}}}),a("span",{staticClass:"input-clear-button"}),a("img",{staticClass:"code",attrs:{src:t.user.codeimg},on:{click:function(e){return t.__setCall({fn:"__getcodeimg"})}}})])])]),a("li",{staticClass:"h_o"})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.form.pwd,expression:" form.pwd "}],staticClass:"flex pl_15 pr_15 pt_5 pb_5"},[a("div",{staticClass:"l"},t._l(4,function(e,i){return a("span",{staticClass:"mg_2 w_30 inlb h_5",class:[{bgc_g:t.pwdlevel.level<=i},t.pwdlevel.level>i&&"bg"+t.pwdlevel.cls]})}),0),a("div",{staticClass:"r",class:t.pwdlevel.cls},[a("span",[t._v("密码强度：")]),a("span",[t._v(t._s(t.pwdlevel.text))])])]),a("f7-block",{staticClass:"mb_5"},[a("f7-button",{attrs:{round:"round",fill:"fill",large:"large"},on:{click:t.autoRegist}},[t._v("注册")])],1),a("div",{staticClass:"t_c"},[a("span",{staticClass:"v_m"},[t._v("已有账户，去")]),a("f7-button",{staticClass:"inlb",attrs:{"popup-close":"#register"},on:{click:function(e){t.__setCall({fn:"__initLoginPopup"})||t.$f7.popup.open("#login")}}},[t._v("登录")])],1)],1)},s=[]}});