webpackJsonp([3],{1202:function(t,s,i){"use strict";function e(t){i(1210)}Object.defineProperty(s,"__esModule",{value:!0});var a=i(1206),r=i(1212),o=i(0),l=e,c=Object(o.a)(a.a,r.a,r.b,!1,l,null,null);s.default=c.exports},1206:function(t,s,i){"use strict";var e=i(1),a=i(4);s.a={mixins:[e.a],components:{},name:"me",props:[],data:function(){return{mycenter:!0}},computed:{progress:function(){return Math.min(Number((100*this.user.exp/this.user.nexMinExp).toFixed(2))||0,100)}},created:function(){this.getUserIdentity()},methods:{getUserIdentity:function(){var t=this;this.$.get(a.a.getUserIdentity).then(function(s){var i=s.data;t.__setUser(i)})}}}},1210:function(t,s,i){var e=i(1211);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(1199)("5d01e995",e,!0,{})},1211:function(t,s,i){s=t.exports=i(1198)(!1),s.push([t.i,'.me{--f7-list-bg-color:rbga(0,0,0,0);--f7-list-item-after-text-color:#fff;--f7-list-chevron-icon-color:#fff}.me .list .item-media+.item-inner{margin-left:0}.me .button.wp_50{padding:0}.me .button.wp_50:first-child{border-top-left-radius:10px}.me .button.wp_50:first-child:after,.me .button.wp_50:first-child:before{content:"";position:absolute;right:0;top:0;width:20px}.me .button.wp_50:first-child:after{height:100%;border-bottom-left-radius:20px 40px;background-color:var(--f7-page-bg-color)}.me .button.wp_50:first-child:before{z-index:1;right:10px;height:20px;width:40px;background:radial-gradient(circle at 0 180%,transparent,transparent 70%,var(--f7-page-bg-color) 0)}.me .button.wp_50:nth-child(2){border-top-right-radius:10px}.me .button.wp_50:nth-child(2):after,.me .button.wp_50:nth-child(2):before{content:"";position:absolute;left:0;top:0;width:20px}.me .button.wp_50:nth-child(2):after{height:100%;border-bottom-right-radius:20px 40px;background-color:var(--f7-page-bg-color)}.me .button.wp_50:nth-child(2):before{z-index:1;left:10px;height:20px;width:40px;background:radial-gradient(circle at 100% 180%,transparent,transparent 70%,var(--f7-page-bg-color) 0)}',""])},1212:function(t,s,i){"use strict";i.d(s,"a",function(){return e}),i.d(s,"b",function(){return a});var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"me page"},[i("div",{staticClass:"page-content pt_0"},[i("f7-list",{staticClass:"mg_0",attrs:{"no-hairlines":"no-hairlines"}},[i("f7-list-item",{staticClass:"bgc_f"},[i("f7-icon",{staticClass:"_icon",class:"_level_"+(t.user.level+1),staticStyle:{height:"100%",width:"80px"},attrs:{slot:"media",f7:" home ",size:"80px"},slot:"media"}),i("div",{staticClass:"ft_14 minw_160"},[i("div",{staticClass:"mg_5"},[t._v(t._s(t.user.userName))]),i("div",{staticClass:"mg_5"},[i("f7-progressbar",{staticClass:"h_10 r_5",attrs:{progress:t.progress}})],1),i("div",{staticClass:"mg_5 ft_12"},[i("f7-button",{staticClass:"pd_0 hlh_20 inlb w_40",attrs:{fill:"fill"}},[t._v(t._s(t.user.levelName))]),i("span",{staticClass:"c_9"},[t._v(" "+t._s(t.user.exp)+"/"+t._s(t.user.nexMinExp))])],1)]),i("div",{staticClass:"b"},[i("f7-button",{attrs:{color:"gray",outline:"outline",round:"round",href:"/settings/"}},[i("f7-icon",{staticClass:"_icon _settings",attrs:{f7:"home",size:"19"}}),i("span",[t._v("设置")])],1)],1)],1)],1),i("div",{staticClass:"pl_10 pr_10 bgc_f c_f"},[i("f7-list",{staticClass:"mg_0 no_border _bg _me_wallet ft_14",attrs:{"no-hairlines":"no-hairlines"}},[i("f7-list-item",{staticClass:"no_active_state",attrs:{title:"我的钱包",after:"全部",link:"/me/wallet/"}}),i("f7-list-item",t._l(t.config.wallets.slice(0,3),function(s,e){return i("div",[i("div",[t._v(t._s(t.user[s.key]||"0.000"))]),i("div",[t._v(t._s(s.n))])])}),0)],1)],1),i("div",{staticClass:"pt_5 pb_5 bg-color-white"},[i("f7-toolbar",{staticClass:"ft_12 c_333 bg-color-white",attrs:{labels:"labels"}},[i("f7-link",{staticClass:"_icon _load",attrs:{"icon-f7":" home ",href:"/me/load/"}},[t._v("充值")]),i("f7-link",{staticClass:"_icon _withdraw",attrs:{"icon-f7":" home ",href:"/me/withdraw/"}},[t._v("提现")]),i("f7-link",{staticClass:"_icon _transfer",attrs:{"icon-f7":" home ",href:"/me/transfer/"}},[t._v("转帐")]),i("f7-link",{staticClass:"_icon _xyb",attrs:{"icon-f7":" home ",href:"/me/xyb/"}},[t._v("信游宝")])],1)],1),i("div",{staticClass:"mt_10"},[i("f7-button",{staticClass:"hlh_40 r_0 wp_50 inlb",attrs:{color:t.mycenter?"":"black bg-color-white",active:t.mycenter},on:{click:function(s){t.mycenter=!0}}},[t._v("个人中心")]),i("f7-button",{staticClass:"hlh_40 r_0 wp_50 inlb",attrs:{color:t.mycenter?"black bg-color-white":" bg-color-orange",active:!t.mycenter},on:{click:function(s){t.mycenter=!1}}},[t._v("代理中心")])],1),i("div",{staticClass:"box pt_10 pb_10",class:{"my bg-color-deeporange":t.mycenter,"notmy bg-color-orange":!t.mycenter}},[i("div",{staticClass:"ml_10 mr_10"},[i("f7-row",[t.mycenter?[i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/rfs/bc/"}},[t._v("彩票记录")])],1),i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/rfs/cr/"}},[t._v("资金记录")])],1),i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/rfs/pl/"}},[t._v("盈亏报表")])],1)]:[i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/agent/openAccountMgr"}},[t._v("开户管理")])],1),i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/agent/lowerLevelMgr"}},[t._v("下级管理")])],1),i("f7-col",{attrs:{width:"33"}},[i("f7-button",{staticClass:"hlh_40",attrs:{"bg-color":"white",color:"black",href:"/rfs/tpl/"}},[t._v("团队盈亏")])],1)]],2)],1),i("f7-list",{staticClass:"mg_0 no_border",attrs:{"no-hairlines":"no-hairlines"}},[i("ul",{staticClass:"bgc_o"},[t.mycenter?[i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"账户安全",link:"/me/safecenter/"}},[i("f7-icon",{staticClass:"mr_5 _icon _account_safe",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"银行卡",link:"/me/bank/"}},[i("f7-icon",{staticClass:"mr_5 _icon __bank_card",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"彩票奖金",link:"/me/bonus/"}},[i("f7-icon",{staticClass:"mr_5 _icon _lottery_bonus",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"帮助中心",link:"/me/help/"}},[i("f7-icon",{staticClass:"mr_5 _icon _help_center",attrs:{slot:"media",f7:" home "},slot:"media"})],1)]:[i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"下级个人盈亏",link:"/rfs/_pl/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_game_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"下级彩票记录",link:"/rfs/_bc/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_game_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"下级账变明细",link:"/rfs/ac/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_game_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"日工资管理",link:"/rfs/ds/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_game_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"分红管理",link:"/rfs/fh/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_game_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1),i("f7-list-item",{staticClass:"ft_14 bgc_f mg_10",attrs:{title:"佣金管理",link:"/rfs/yj/"}},[i("f7-icon",{staticClass:"mr_5 _icon _sub_fund_record",attrs:{slot:"media",f7:" home "},slot:"media"})],1)],i("f7-list-button",{staticClass:"bgc_f mg_10",on:{click:function(s){return t.__setCall({fn:"__logout"})}}},[t._v("退出")])],2)])],1)],1)])},a=[]}});