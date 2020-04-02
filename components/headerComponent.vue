<template>
<div>
  Header
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  transition: 'page',
  components: {
    
  },
  data: function() {
    return {
      
    }
  },
  watch: {
    
  },
  computed: {
    /* ...mapGetters(['property', 'timezone', 'getTodayHours']) */
  },
  methods: {
    loadData: async function(id) {
      try {
      } catch (e) {
        console.log('Error loading data: ' + e.message)
      }
    },
    close(e) {
    },
  },
  created() {
    this.loadData();
  },
  beforeDestroy() {
  }
}
</script>
<style>
@media (max-width: 768px) {
  .mobile-heading {
    display: flex;
    justify-content: center;
  }
}
</style>