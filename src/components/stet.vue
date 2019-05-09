
<script>
export default {
  components: {
  },
  name: 'stet',
  props: [],
  data () {
    return {
      stet: [new Date()._setHMS(), new Date()._setHMS('23:59:59')]
    }
  },
  computed: {
    __stetn () {
      let x = [this.stet[0].__toDayString(), this.stet[1].__toDayString()]
      return x[0] === x[1] ? [x[0]] : x
    },
  },
  created () {
  },
  methods: {
  }
}
</script>

