<script>
// output interface define
export default {
  name: 'rf',
  created () {
    window.steambind = (n) => {
      // if (n) this.__setCall({fn: '__acctSecureInfo'})
      if (n) this.__acctSecureInfo().then(() => { this.__setCall({fn: '__setDpageId', args: ''}) })
      // else this.$router.push(this.$route.path + '?steambind=1')
      else this.__setCall({fn: '__GetSteamInfo'})
    }
    window.closeIFrame = ({action, args, h}) => {
      switch (action) {
        case 'setHeight':
          let iframeEl = window.document.querySelector('iframe')
          iframeEl.style.height = h + 'px'
          break
        case 'goToLoad':
          this.__setCall({fn: '__setDpageId', args: 'Load'})
          break
        case 'goToList':
          this.__setCall({fn: '__reloadPromo'})
          break
        case 'goToCoupon':
          this.__go('/promo/', {props: {tabid: '#coupon'}}) // 优惠券
          break
        case 'goPromo':
          this.$router.push('/user')
          break
        case 'goSport':
          this.$router.push('/sports')
          break
        case 'goLogin':
          this.__setCall({fn: '__setDpageId', args: 'Login'})
          break
        case 'goEgame':
          this.$router.push('/egame/' + args)
          break
        case 'goSignIn':
          this.$f7.popup && this.$f7.popup.open('#signin')
          break
      }
    }
  }
}
</script>
