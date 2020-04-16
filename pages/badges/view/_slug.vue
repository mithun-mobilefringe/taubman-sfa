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
                <!-- <div class="id-badge-container">
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
                </div> -->
              </div>
            </div>
          </div>
          <div class="app-step-btn text-center">
            <nuxt-link
              :to='getEditURL()'
              id="btn_badge_preview_edit"
              class="btn btn-outline-green"
            >
              <i class="fa fa-pencil"></i>
              {{$t('app.edit_badge')}}
            </nuxt-link>
            <nuxt-link
              to="/badges"
              id="btn_view_badge_cancel"
              style="color: #6abaad;"
            >
              <i class="fa fa-arrow-left"></i>
              Back
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
      'previewComponent': () => import('~/components/previewComponent.vue')
  },
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
    this.$store.state.headerfile = require("~/assets/img/t-view-badge.png");
    if (!this.cadet.picture_url) {
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
    getEditURL: function () {
      return "/badges/edit/" + this.$route.params.slug
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