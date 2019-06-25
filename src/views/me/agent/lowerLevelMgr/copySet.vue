<template lang="pug">
f7-page.copyset-to-pg
  f7-navbar(title="复制下级设置" back-link top)
  f7-row.h_40.bgc_f.flex-ai-c.pl_25
    f7-col 下级用户名： {{name}}
  f7-row.h_40.flex-ai-c.pl_25
    f7-col 请选择要复制的内容


</template>

<script>
import api from '@/api'
import config from '@/config'
export default {
  name: 'copySet',
  mixins: [config],
  props: ['name', 'id', 'myId'],
  data () {
    return {
      items: [
        {type: 0, name: '返点 / 返水', checked: false},
        {type: 1, name: '日工资', checked: false},
        {type: 2, name: '彩票分红', checked: false},
        {type: 3, name: '三方佣金', checked: false},
      ],
      userInfo: {}
    }
  },
  methods: {
    getUserAll (userId) {
      return this.$.get(api.getUserAll, {subUserid: userId}).then(({data: {backMyArr, cpArr, yjArr, myPointArr, subPointArr}}) => {
        backMyArr.forEach(b => {
          this.userInfo.rebates.push({show: true, userPoint: (b.backWater || 0) > 0 ? ((b.backWater || 0) * 1000 + '‰') : '--', name: b.groupname + '返水'})
        })
        if (cpArr.length > 0) {
          this.userInfo.cp = cpArr[0]
        }
        if (yjArr.length > 0) {
          this.userInfo.yj = yjArr[0]
        }
      })
    },
  }
}
</script>

<style lang="stylus">
// .copyset-to-pg
</style>
