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
              <div class="guide-box col-sm-4" v-for="elf in characters" :key="elf.id">
                {{elf.character_name}}
                <div :class="[{'guide-bio-open': elf.bioOpen}, getClassForElf(elf.character_name)]">
                  <!-- <span>elf.key</span>
                  <a href class="guide-bio-close" @click="onCloseBioClick($event, elf)">Close</a>-->
                </div>
                <button to="/new_badge/preview" @click="onElfClick(elf)" class="btn btn-step md">
                  <i class="fa fa-check"></i> {{$t('new_badge.choose_me')}}
                </button>
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
      guides: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
  },
  computed: {
    ...mapGetters(["property", "timezone", "cadet", "characters", "locale"])
  },
  methods: {
    getClassForElf: function(character_name) {
      return "guide guide-" + character_name.toLowerCase();
    },
    onElfClick: function(elf) {
      this.$store.state.cadet["character"] = elf;
      this.$store.state.cadet["codename"] = this.getCodeName();
      this.$router.push("/new_badge/preview");
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