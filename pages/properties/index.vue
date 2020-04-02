<template>
  <div>
    intial page
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import tz from 'moment-timezone'
export default {
  head() {
  },
  components: {
    //insidePageHeader: () => import('~/components/insidePageHeader.vue')
  },
  data: function() {
    return {
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  created() {
  },
  computed: {
    /* ...mapGetters([
      'property',
      'timezone',
      'processedEvents',
      'findRepoByName',
      'locale'
    ]), */
  },
  methods: {
  }
}
</script>
<style>
</style>