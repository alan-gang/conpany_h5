
<script>
export default {
  components: {
  },
  name: 'stet',
  props: [],
  data () {
    return {
      stet: [new Date()._setH(0)._setM(0)._setS(0), new Date()._setH(23)._setM(59)._setS(59)]
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

