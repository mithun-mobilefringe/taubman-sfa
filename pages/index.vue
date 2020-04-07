<template>
  <div>
    <!-- <header-component :headerfile= headerFileName></header-component> -->
    <!-- Join The Crew -->
    <div id="box_enter_email" class="container box_enter_email">
      <div class="app-body">
        <h2 class="app-lead">{{$t('home.create_badge')}}</h2>
        <div class="green-form">
          <div class="instructions">
            <p class="lead">{{$t('home.enter_email')}}</p>
            <p>{{$t('home.consent')}}</p>
          </div>
          <div>
            <div class="email-textbox">
              <div class="input-group semi-round">
                <span class="input-group-addon bg-light border-light py-2 mail-symbol">
                  <i class="fa fa-envelope-o fa-1_2x"></i>
                </span>
                <input
                  type="email"
                  class="form-control py-2 border-light icon-email"
                  placeholder="santa@exmas.com"
                  v-model="email"
                />
              </div>
            </div>
          </div>
          <!-- <div class="form-row" v-if="error.hasError">
                            <div class="form-group col">
                                <div class="form-error">{{$t('error.message')}}</div>
                            </div>
          </div>-->
        </div>
        <div class="app-checkbox clearfix">
          <div class="form-check">
            <input
              type="checkbox"
              id="chk_optin_receive_emails"
              class="app-check-input"
              v-model="optin"
            />
            <label class="app-check-label" for="chk_optin_receive_emails">
              <span>
                (Optional) Opt-in to also receive emails on sales, stores, events &amp; more. Read
                <a href>Privacy Policy</a> for info use details.
              </span>
            </label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="chk_optin_receive_emails"
              class="app-check-input"
              v-model="optin3d"
            />
            <label class="app-check-label" for="chk_optin_receive_emails">
              <span>
                (Optional) Opt in to receive email updates and exclusive offers from Lovepop – 3D pop-up cards for every occasion. Read the
                <a href>Privacy Policy</a> for info use details.
              </span>
            </label>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="app-step-btn">
            <nuxt-link to="/badges" class="btn btn-step">Next</nuxt-link>
        </div>
      </div>
    </div>
    <!-- /Join The Crew -->
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";
import tz from "moment-timezone";
import Cookies from "js-cookie";

export default {
  data: function() {
    return {
      error: null,
      optin: true,
      optin3d: false,
      email: null,
      headerFileName: require("~/assets/img/t-join-crew.png")
    };
  },
  components: {
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-join-crew.png")
  },
  computed: {
    ...mapGetters(["property", "timezone", "locale"])
  }
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

@media (max-width: 1024px) {
  .box_enter_email {
    min-height: 78vh !important;
  }
}

.box_enter_email {
  min-height: 100vh;
  padding: 0px 10px;
}
.mail-symbol {
  padding-right: 12px;
  padding-left: 12px;
  height: calc(1.5em + 0.75rem + 2px);
}
</style>
