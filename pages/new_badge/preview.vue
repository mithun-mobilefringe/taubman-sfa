<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Badge Preview (Approval Screen) -->
      <div id="box_cadet_choose_approve" class="container box-home new-badge-container">
        <div class="app-body preview-box" style="max-width: 570px">
          <div class="green-form" style="margin-bottom:30px">
            <div class="row">
              <div class="col text-center py-2">
                <previewComponent></previewComponent>
              </div>
            </div>
            <div class="app-checkbox final-box clearfix">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="chk_agree_terms_badge_approve"
                  class="app-check-input"
                  v-model="agree_terms"
                />
                <label class="app-check-label" for="chk_agree_terms_badge_approve">
                  <span>
                    I have read and agree to the
                    <a href="#" style="color: white;">Terms</a> and understand my information will be used in accordance with the
                    <a
                      href="#"
                      style="color: white;"
                    >Privacy Policy</a>
                  </span>
                </label>
              </div>
            </div>
            <div id="box_cadet_preview_error" class="form-row" v-if="previewErrors.length > 0">
              <div class="form-group col">
                <div class="form-error">{{previewErrors[0]}}</div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="app-step-btn text-center preview-button-grp">
            <button
              id="btn_badge_preview_approve"
              class="btn btn-step md approve-button"
              @click="approveBadge()"
            >
              <i class="fa fa-check"></i>
              {{$t('preview.approve_badge')}}
            </button>
            <nuxt-link
              to="/badges/edit/new_badge"
              id="btn_badge_preview_edit"
              class="btn btn-outline-green"
            >
              <i class="fa fa-pencil"></i>
              {{$t('app.edit_badge')}}
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- /Badge Preview -->
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
  components: {
    previewComponent: () => import("~/components/previewComponent.vue")
  },
  data: function() {
    return {
      previewErrors: [],
      agree_terms: false,
      badgeToBeAdded: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
    if (!this.cadet.file) {
      this.cadet[
        "imageURL"
      ] = require("~/assets/img/elfPhotoPlaceholder_160.png");
    }
  },
  computed: {
    ...mapGetters([
      "property",
      "timezone",
      "cadet",
      "locale",
      "is_new_profile",
      "email",
      "profile"
    ])
  },
  methods: {
    approveBadge: function() {
      this.previewErrors = [];
      if (this.agree_terms) {
          this.getBadgeData();
        /* if (this.is_new_profile) {
          this.addProfile();
        } else {
          this.addBadge();
        } */
      } else {
        this.previewErrors.push(
          "You must agree to the Terms and understand the Privacy Policy to proceed!"
        );
      }
    },
    getBadgeData: function() {
      this.badgeToBeAdded = {
        profile_id: this.profile.profile_id,
        short_name: this.cadet.short_name,
        gender: this.cadet.gender,
        character: this.cadet.character.character_name,
        suit: this.cadet.suit,
        codename: this.cadet.codename
      };
      if (this.cadet.file) {
        var path = "/add_picture";
        let formData = new FormData();

        formData.append("file", this.cadet.file);
        formData.append("mall_id", this.property.id);
        formData.append("signature", this.property.api_key);
        formData.append("timestamp", new Date());

        var axiosConfig = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };

        this.$store
          .dispatch("POST", {
            path: path,
            data: formData,
            axiosConfig: axiosConfig
          })
          .then(response => {
            this.badgeToBeAdded["picture_url"] = response.data.data.picture_url;
            this.addprofileOrBadge(this.badgeToBeAdded);
          })
          .catch(function() {
            console.log("FAILURE!!");
          });
      } else {
        this.addprofileOrBadge(this.badgeToBeAdded);
      }
    },
    addprofileOrBadge: function(badgeData){
        if (this.is_new_profile) {
          this.addProfile(badgeData);
        } else {
          this.addBadge(badgeData);
        }
    },
    addBadge: function(badgeData) {
        var path = "/add_badge";
        var data = badgeData;

        this.postMethod(path, data).then(
        response => {
            this.updateProfile();
        },
        error => {
            console.log("Error: " + error);
        }
        );
    },
    addProfile: function(badgeData) {
      let path = "/add_profile";
      let data = {
        email: this.email,
        confirmation_code: "A123456789",
        badges: [badgeData]
      };
      this.postMethod(path, data).then(
        response => {
          this.$router.push("/badges");
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    updateProfile: function() {
      let path = "/get_profile_by_email";
      let data = this.email;
      this.postMethod(path, data).then(
        response => {
          var profile = response.data.data;
          if (profile) {
            this.$store.state.profile = profile;
            this.$store.state.is_new_profile = false;
            this.$router.push("/badges");
          }
        },
        error => {
          console.log("Error: " + error);
        }
      );
    }
  }
};
</script>
<style>
.preview-box {
  margin-top: 60px;
  width: 570px;
}
@media (min-width: 769px) and (max-width: 1025px) {
  .preview-box {
    margin-top: 170px;
    min-height: 65vh;
  }
}
@media (min-width: 1025px) {
  .approve-button {
    margin-right: 10px;
  }
  .preview-button-grp {
    display: flex;
  }
}
</style>