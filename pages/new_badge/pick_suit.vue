<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Choose Suit -->
      <div id="box_cadet_choose_suit" class="container box-home new-suit-container">
        <div class="step step-2"></div>
        <div class="col-sm-6 mx-auto">
          <h2
            class="app-lead"
            style="margin-bottom: 10px;"
          >Choose {{cadet.short_name}}'s virtual flight suit, handmade by our special elves.</h2>
          <div class="no-form">
            <div class="select-container">
              <div class="selection select-1">
                <button
                  id="btn_choose_suit_m"
                  class="btn btn-select"
                  @click="saveSuit('M')"
                >{{$t('app.choose')}}</button>
              </div>
              <div class="selection select-2">
                <button
                  id="btn_choose_suit_f"
                  class="btn btn-select"
                  @click="saveSuit('F')"
                >{{$t('app.choose')}}</button>
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
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
  },
  computed: {
    ...mapGetters(["property", "timezone", "locale", "cadet"])
  },
  methods: {
    saveSuit: function(gender) {
      this.$store.state.cadet["gender"] = gender;
      if (gender == "M") {
        this.$store.state.cadet["suit"] = "boy";
      } else {
        this.$store.state.cadet["suit"] = "girl";
      }
      this.$router.push("/new_badge/add_photo");
    }
  }
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
@media (min-width: 1025px) {
  .new-suit-container {
    margin-top: 46px 
  }
}
@media (max-width: 414px) {
  .new-suit-container {
    margin-top: 61px !important;
  }
}
@media (max-width: 768px) {
  .new-suit-container {
    margin-top: 86px !important;
    justify-content: start;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
    .new-suit-container {
      margin-top: 121px !important;
      justify-content: start;
    }
}
</style>