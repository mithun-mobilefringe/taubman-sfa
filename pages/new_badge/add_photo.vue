<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Picture -->
      <div id="box_cadet_upload_pic">
        <!-- Picture Upload -->
        <div class="container box-home create-new-badge-container">
          <div class="step step-3"></div>
          <div class="col-sm-6 mx-auto">
            <h2 class="app-lead">Add a photo to use on TODO : Mithun's badge.</h2>
            <div class="no-form">
              <div class="photo-form text-center">
                <div
                  id="box_photo_uploader"
                  class="photo-box"
                  data-upload-url="http://sfa.projects.extanet.com"
                >
                  <div class="fallback">
                    <input name="file" type="file" accept="image/*" capture="camera" />
                  </div>
                  <input name="picture_id" type="hidden" id="picture-id" value />
                  <input name="picture_url" type="hidden" id="picture-url" value />
                </div>
                <div id="box_photo_upload_error" class="form-row" style="display: none;">
                  <div class="form-group col">
                    <div class="form-error">{{$t('error.message')}}</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col green-text">
                    Your photo must be at least 250 pixels wide and
                    <br />250 pixels tall. The maximum file size is 4 MB.
                  </div>
                </div>
                <div id="box_photo_upload_controls" style="display: none;">
                  <div class="form-row">
                    <div class="col">
                      <nuxt-link
                        to="/new_badge/choose_elf"
                        id="btn_photo_upload_use"
                        class="btn btn-step md"
                      ><i class="fa fa-check"></i> {{$t('add_photo.use_photo')}}</nuxt-link>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                        <nuxt-link
                        to="/new_badge/add_photo"
                        id="btn_photo_upload_remove"
                        class="btn btn-outline-green"
                      ><i class="fa fa-times"></i> {{$t('add_photo.remove_photo')}}</nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col">
                      <nuxt-link
                        to="/new_badge/choose_elf"
                        id="btn_photo_upload_skip"
                        class="muted-green"
                      >{{$t('add_photo.skip')}} <i class="fa fa-1_5x fa-arrow-right"></i></nuxt-link>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
        <!-- /Picture Upload -->
      </div>
      <!-- /Picture -->
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