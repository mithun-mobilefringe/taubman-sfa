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
            <div class="form-group email-textbox">
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
          <div class="form-row" v-if="emailErrors">
              <div class="form-group col" v-for="error in emailErrors" :key="error">
                  <div class="form-error">{{error}}</div>
              </div>
          </div>
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
        </div>
        <div class="app-step-btn">
            <button class="btn btn-step" @click="saveEmail()">Next</button>
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
      emailErrors: [],
      optin: true,
      email: null,
      headerFileName: require("~/assets/img/t-join-crew.png")
    };
  },
  components: {
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-join-crew.png")
    let ppt = this.$cookies.get("taubman-property");
    this.property = ppt;
    let mailID = this.$cookies.get("taubman-"+ this.property.id +"-email");
    if(mailID){
      this.email = mailID;
      this.$store.state.email = mailID;
      this.getProfile();
    }
    
  },
  computed: {
     ...mapGetters(["property", "timezone", "locale"])
  },
  methods: {
    saveEmail: function() {
      this.emailErrors = [];
      if(this.checkform()){
        this.$store.state.email = this.email;
        this.$cookies.set("taubman-"+ this.property.id +"-email", this.email);
        this.getProfile();
      }
    },
    getProfile: function () {
      let path = "/get_profile_by_email";
        let data = {
          "email": this.email,
        }
      this.postMethod(path,data).then(response => {
        var profile = response.data.data;
        if(profile) {
          this.$store.state.profile = profile;
          this.$store.state.is_new_profile = false;
          this.$router.push('/badges');
        } else {
          this.$store.state.is_new_profile = true;
          this.$router.push('/new_badge');
        }
      }, (error) => { 
        console.log("Error: " + error);
      });
    },
    checkform: function() {
      if (!this.email) {
        this.emailErrors.push('Please Enter your Email Address');
      } else if (!this.validEmail(this.email)) {
        this.emailErrors.push('Valid email required');
      }

      if (!this.emailErrors.length) {
        return true;
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
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
}
</style>
