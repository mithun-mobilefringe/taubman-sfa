<template>
  <div>
    <!-- Choose Elf -->
    <div
      id="box_cadet_choose_elf"
      class="container box-home new-badge-container"
      data-ng-controller="cadetElf"
      data-ng-if="screens.active === 'cadet-builder-elf'"
    >
    <div class="step step-4"></div>
      <div class="col-sm-8 mx-auto">
        <h2 class="col-sm-8 mx-auto app-lead">Everyone needs a little elf help. Choose a guide</h2>
        <div class="no-form">
          <div class="chooose-guid-form text-center">
            <div class="form-row">
              <div class="guide-box col-sm-4" v-for="elf in guides" :key="elf.key">
                {{elf.key}}
                <div
                  
                  :class="[{'guide-bio-open': elf.bioOpen}, 'guide guide-{{elf.key}}', getClassForElf(elf.key)]"
                  @click="onElfClick($event, elf)"
                >
                <span>elf.key</span>
                  <a href class="guide-bio-close" @click="onCloseBioClick($event, elf)">Close</a>
                </div>
                <nuxt-link to="/new_badge/preview" class="btn btn-step md">
                  <i class="fa fa-check"></i> Choose me!
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <!-- /Choose Elf -->
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
    return {
        guides:null
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
    this.guides = [{key: 'george'}, {key: 'sparkle'}, {key: 'flash'}]
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
    getClassForElf: function(elf) {
      console.log("EFL : " + elf);
      return "guide guide-" + elf;
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
</style>