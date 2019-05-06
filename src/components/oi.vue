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
    window.closeIFrame = ({action, args}) => {
      switch (action) {
        case 'goToLoad':
          this.__setCall({fn: '__setDpageId', args: 'Load'})
          break
        case 'goToList':
          this.__setCall({fn: '__reloadPromo'})
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
      }
    }
  }
}
</script>

