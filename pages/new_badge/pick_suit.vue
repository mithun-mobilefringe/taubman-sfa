<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Choose Suit -->
      <div id="box_cadet_choose_suit" class="container box-home create-new-badge-container">
        <div class="step step-2"></div>
        <div class="col-sm-6 mx-auto">
          <h2
            class="app-lead"
            style="margin-bottom: 10px;"
          >Choose Todo:Mithun's virtual flight suit, handmade by our special elves.</h2>
          <div class="no-form">
            <div class="select-container">
              <div class="selection select-1">
                <nuxt-link
                  to="/new_badge/add_photo"
                  id="btn_choose_suit_m"
                  class="btn btn-select"
                >{{$t('app.choose')}}</nuxt-link>
              </div>
              <div class="selection select-2">
                <nuxt-link
                  to="/new_badge/add_photo"
                  id="btn_choose_suit_f"
                  class="btn btn-select"
                >{{$t('app.choose')}}</nuxt-link>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <!-- /Choose Suit -->
    </div>
    <!-- /Cadet Builder -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import moment from "moment";
import tz from "moment-timezone";
export default {
  head() {},
  components: {},
  data: function() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
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
  methods: {}
};
</script>
<style>
.red-box {
  display: flex;
  flex-direction: column;
}
.btn-home-fast-pass {
  white-space: normal !important;
  word-wrap: break-word;
}
.create-badge-link {
  display: flex;
  cursor: pointer;
}
</style>