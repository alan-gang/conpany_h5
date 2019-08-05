<template lang="pug">

f7-page.car
  f7-navbar(:title=" n " back-link)
  f7-toolbar(top)
    f7-row.wp_100
      f7-col(width="33")
        f7-button(fill  @click=" __back ")
          f7-icon(f7="add" style="display: inline-block" size="20px")
          span 手动投注 
      f7-col(width="33")
        f7-button(fill @click=" __setCall({fn: '__random'}) ") 
          f7-icon(f7="add" style="display: inline-block" size="20px")
          span 机选投注 
      f7-col(width="33")
        f7-button(fill @click=" clear ")   
          f7-icon(f7="trash" style="display: inline-block" size="16px" )
          span 清空投注
  
  f7-toolbar(bottom)
    f7-row.wp_100.a_c
      f7-col.t_r(width="50")
        span.text-color-deeporange {{ NA.n }}
        span  注
        span.pd_5
        span.text-color-deeporange {{ NA.a._f3() }}
        span  元
        
      f7-col(width="25")
        f7-button(fill color="orange" @click=" __go('/game/chase/', {props: {id, n}}) ") 
          span 追号 
      f7-col(width="25")
        f7-button(fill @click=" checkntsf() && booking() ")   
          span 投注
  
    .p_a.issue.bg-color-white.pl_15.pr_15.pt_10.pb_10
      f7-checkbox(name=" $usexycoin " :checked=" local.$usexycoin " @click=" __setLocal({$usexycoin: !local.$usexycoin}) ")
      span(@click=" __setLocal({$usexycoin: !local.$usexycoin}) ")  使用信游币
        span.c_orange.ft_12  {{ user.freeAvaiable }}
      template(v-if=" issueList ")
        f7-list.inline-picker.f_r.mg_0(no-hairlines)
          f7-list-item.hlh_25(title="期号" smart-select :smart-select-params="{openIn: 'sheet'}" ref="issuevm")
            select(v-model=" issue ")
              option(:value=" v.issue " v-for=" (v, i) in issueList " :key=" i ") {{ v.issue }} {{ i === 0 ? '(当前期)' : '' }}


  f7-list.mg_10.no_border(no-hairlines v-for=" (v, i) in __$car " :key=" '' + i + v.methodid + v.count + v.codes.slice(0, 6) ")
    li.swipeout.mg_0(@swipeout:delete=" onDeleteCarItem(v) ")
      
  
      //- f7-card(v-for=" (v, i) in __$car " :key="i" )
      .swipeout-content
        f7-card.mg_0
          
          f7-card-content
            p 
              f7-button.t_l.pd_0(color="black") {{ v.codes }}
            p 
              span {{ v.mido.gn + '_' + v.mido.n }} 
              span.text-color-orange {{ v.count }} 
              span 注 
              span.text-color-orange {{ v.money._f3() }} 
              span 元
            div
              f7-stepper.v_m(small autorepeat type="number" pattern="[0-9]*" color="gray" :value=" v.times " :min="1" :max="1000" :step="1" @stepper:change=" update((v.times = $event) ? v : v) ")
              
              span.pd_5
              .list.inline-picker.border-gray
                ul(style="padding-left: 0")
                  f7-list-item.hlh_25(title="模式" smart-select :smart-select-params="{openIn: 'popover'}")
                    select(v-model=" v.mode " @change=" update(v) ")
                      option(:value=1) 元
                      option(:value=2) 角
                      option(:value=3) 分
                      option(:value=4) 厘

              span.pd_5
              span.v_m(@click=" sap = dp = v" v-if=" v.dp && (Number(v.dp.maxpoint) > Number(v.dp.minpoint)) ")
                span 返点 
                span.border-gray.inlb.hlh_25.pl_10.pr_10.text-color-gray {{ (v.userpoint * 100)._f1() }} %
                  span.pl_5
                  f7-icon(f7=" chevron_down " color="gray" size="18px" style="opacity: .7")

                
                point(v-for=" (x, j) in v.cpoints " :key="j" v-bind=" {dp: x, i: j, mid: v.mid, $p: v.userpoint} " @update=" $set(v.bonuses, j, $event) ")
      
      f7-swipeout-actions(right)
        f7-swipeout-button(delete) 删除

  

  adjustpoints(v-if=" sap && dp.dp && (Number(dp.dp.maxpoint) > Number(dp.dp.minpoint)) " v-on:hideadjustpoints=" sap = $event " v-bind=" {dp: dp.dp, v: dp.userpoint, bonusRange: dp.bonuses} " v-on:adjust:point=" dp.userpoint = $event ")






</template>

<script>
import config from '@/config'
import api from '@/api'
import issue from './issue'
import adjustpoints from './adjustpoints'
import point from './point'
export default {
  mixins: [config, issue],
  components: {
    adjustpoints,
    point,
  },
  name: 'car',
  props: ['id', 'n', 'mid'],
  data () {
    return {
      // show gamepoints
      dp: null,
      sap: false,
    }
  },
  computed: {
    NA () {
      return this.__$car.reduce((p, x, i) => {
        p.n += x.count
        p.a += Number(x.money)
        return p
      }, {n: 0, a: 0})
    },
    // not sufficient funds
    ntsf () {
      return (this.user[!this.local.$usexycoin ? 'availableBalance' : 'freeAvaiable'] * 1) < this.NA.a
    }
  },
  watch: {
    ntsf (n, o) {
      if (n) this.__alert((!this.local.$usexycoin ? '余额' : '信游币') + '不足')
    }
  },
  created () {
  },
  methods: {
    checkntsf () {
      if (this.ntsf) this.__alert((!this.local.$usexycoin ? '余额' : '信游币') + '不足')
      return !this.ntsf
    },
    update (v) {
      v.money = (v.count * v.up_ * v.times * [1, 0.1, 0.01, 0.001][v.mode - 1])._f3()
    },
    __getBookingArgs () {
      return {
        gameid: this.id,
        issue: this.issue,
        totalnums: this.NA.n,
        totalmoney: this.NA.a,
        // 追号为2
        type: 1,
        isusefree: Number(!!this.local.$usexycoin),
        isJoinPool: 0,
        trace: '',
        items: JSON.stringify(this.__$car.map(x => {
          return Object.assign({}, x, {mido: undefined, dp: undefined, cpoints: undefined, bonuses: undefined, up_: undefined, id: undefined})
        })),
      }
    },
    booking () {
      this.$.post(api.booking, this.__getBookingArgs()).then(this.clear)
    },
    clear () {
      this.__setLocal({$car: []})
      this.__back()
    },
    onDeleteCarItem (v) {
      this.local.$car.splice(this.local.$car.findIndex(x => x === v), 1)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.car
  .hp_100
    padding 0 1px
    line-height 26px
    background-color #efefef
  .border-gray
    border 1px solid #efefef
  
  .issue
    bottom var(--f7-toolbar-height)
    left 0
    right 0
    border-top 1px solid #eee
  
  .page-content
    --f7-page-toolbar-bottom-offset calc(var(--f7-toolbar-height) + 40px)
    
    
    
</style>
