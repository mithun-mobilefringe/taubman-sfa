<template>
  <div class="container">
    {{$t('welcome')}}
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import tz from 'moment-timezone'

export default {
  data: function() {
    return {
      property_id: "",
      property: null
    }
  },
  components: {
    Logo
  },
  created() {
    this.property = this.$store.state.property;
    console.log("property in index : " + this.property);
  },
  computed: {
    ...mapGetters(['property', 'timezone', 'locale'])
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
