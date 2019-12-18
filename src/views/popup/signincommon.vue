<script>
import api from '@/api'
import { getFirstDayOfMonth, getDaysOfMonth } from '@/util/Date'
import { global } from '@/store'
export default {
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      date: null,
      checkinCount: 0,
      daysOfMonth: 0,
      firstDay: 0,
      curDay: 0,
      // checkinDateList: [],
      curMonth: 0,
      checkinList: [],
    }
  },
  computed: {
    checkinDateList () {
      return global.state.checkinDateList
    }
  },
  created () {
    this.date = new Date()
    this.curMonth = this.date.getMonth() + 1
  },
  methods: {
    initData () {
      this.curDay = this.date.getDate()
      this.firstDay = getFirstDayOfMonth(this.date)
      this.daysOfMonth = getDaysOfMonth(this.date.getFullYear(), this.date.getMonth())
    },
    getCheckInfo (cb) {
      this.$.myget(api.getCheckInfo).then(({data}) => {
        if (data.data.length > 0) {
          this.checkinCount = data.data.length
          this.checkinList = data.data.map(x => new Date(x)._toDayString())
          // filter过滤出当月的签到日期
          let checkinDateList = data.data.fliter(x => new Date(x).getMonth() === (this.curMonth - 1)).map((d) => new Date(parseInt(d, 10)).getDate())
          this.___setGlobal({checkinDateList})
        }
        cb && cb(data)
      })
    },
    checkIn () {
      this.$.post(api.checkIn, {}).then(({data}) => {
        this.getCheckInfo()
        this.$f7.popup && this.$f7.popup.close('#signin')
        this.$f7.popup.open('#signinsuccess')
        this.__setCall({fn: '__setPrizes', args: data.data})
      })
    },
    getCls (d) {
      if (d < this.curDay) {
        return this.checkinDateList.includes(d) ? 'signed' : 'miss'
      } else if (d === this.curDay) {
        return this.checkinDateList.includes(d) ? 'signed' : 'today'
      } else {
        return ''
      }
    },
    closePanel () {
      this.$f7.panel && this.$f7.panel.close()
    },
    closePopup () {
      this.$f7.popup && this.$f7.popup.close('#signin')
    },
    __getCheckInfoFaild () {
      this.closePanel()
      this.closePopup()
    },
    ___setGlobal: global.actions.__setGlobal
  }
}
</script>
