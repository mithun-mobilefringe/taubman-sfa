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
                <div class="id-badge-container">
                  <div class="id-badge-img">
                    <div
                      class="id-badge-img-container"
                      :style="`background-image: url({{ cadet.imageURL}});`"
                    ></div>
                  </div>
                  <div class="id-badge-name">
                    <span>{{cadet.name}}</span>
                  </div>
                  <div class="id-badge-codename">
                    <span>"{{cadet.character.name}}"</span>
                  </div>
                  <div class="id-badge-specialty">
                    <span>{{JSON.parse(this.cadet.character.job_title)[this.locale]}}</span>
                  </div>
                  <div class="id-badge-mall">
                    <span>{{property.name}}</span>
                  </div>
                </div>
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
                    <a href="#" style="color: white;">Privacy Policy</a>
                  </span>
                </label>
              </div>
            </div>
            <div id="box_cadet_preview_error" class="form-row" v-if="errors.length > 0">
              <div class="form-group col">
                <div class="form-error">{{errors[0]}}</div>
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
              to="/badges/edit/1"
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
  components: {},
  data: function() {
    return {
      errors: [],
      agree_terms: false
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
    debugger;
    if (!this.cadet.imageURL) {
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
      this.errors = [];
      if (this.agree_terms) {
        if (this.is_new_profile) {
          let path = "/add_profile";
          let data = {
            email: this.email,
            confirmation_code: "A123456789",
            badges: [this.getBadgeData()]
          };
          /* this.postMethod(path, data).then(response => {
                    this.$store.state.characters = response.data.data.characters;
                    this.$cookies.set("taubman-characters", response.data.data);
                    this.$router.push('/new_badge/pick_suit');
                }, error => {
                    console.log("Error: " + error);
                });  */
        } else {
          let path = "/add_badge";
          let data = this.getBadgeData();

          this.postMethod(path, data).then(
            response => {
              this.$router.push("/badges");
            },
            error => {
              console.log("Error: " + error);
            }
          );
        }
      } else {
        this.errors.push(
          "You must agree to the Terms and understand the Privacy Policy to proceed!"
        );
      }
    },
    getBadgeData: function() {
      let data = {
        profile_id: this.profile.profile_id,
        short_name: this.cadet.name,
        gender: this.cadet.gender,
        character: this.cadet.character.character_name,
        suit: this.cadet.suit,
        codename: "Bells"
      };
      if (this.cadet.picture_url) {
        data["picture_url"] = this.cadet.picture_url;
      }
      return data;
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