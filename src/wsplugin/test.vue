<template>
    <div>
        {{detail.close}}
    </div>
</template>
<script>

  import _ from 'underscore'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        detail: state => state.detail,
      }),
    },
    created () {
      this.$socket.sendObj({
        type: 0,
        id: _.uniqueId(),
        api: 'quote.detail',
        topic: 'cmb19.btcusdt'
      })
    }
  }
</script>
