<template>
  <div>
    <!-- Cadet Builder -->
    <div>
        <!-- Picture Upload -->
        <div id="box_cadet_upload_pic" class="container box-home add-photo-container">
          <div class="step step-3"></div>
          <div class="col-sm-6 mx-auto">
            <h2 class="app-lead">Add a photo to use on : {{cadet.short_name}}'s badge.</h2>
            <div class="no-form">
              <div class="photo-form text-center">
                <div
                  id="box_photo_uploader"
                  class="photo-box"
                  data-upload-url="http://sfa.projects.extanet.com"
                  v-if="!imageData"
                >
                
                  <div class="fallback">
                    <input name="file" type="file" ref="file" accept="image/*" capture="camera" v-on:change = 'handleFileUpload()'/>
                  </div>
                </div>
                <div class="user-photo-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData">
                </div>
                <div id="box_photo_upload_error" class="form-row" v-if="error">
                  <div class="form-group col">
                    <div class="form-error">{{error}}</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col green-text">
                    Your photo must be at least 250 pixels wide and
                    <br />250 pixels tall. The maximum file size is 4 MB.
                  </div>
                </div>
                <div id="box_photo_upload_controls" v-if="is_photo_available">
                  <div class="form-row">
                    <div class="col">
                      <button
                        to="/new_badge/choose_elf"
                        id="btn_photo_upload_use"
                        class="btn btn-step md"
                        @click="add_photo_url()"
                      ><i class="fa fa-check"></i> {{$t('add_photo.use_photo')}}</button>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                        <button
                        id="btn_photo_upload_remove"
                        class="btn btn-outline-green"
                        @click="remove_photo()"
                      ><i class="fa fa-times"></i> {{$t('add_photo.remove_photo')}}</button>
                    </div>
                  </div>
                </div>
                <div class="form-row" v-if="!is_photo_available">
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
      file: '',
      imageData: '',
      is_photo_available: false,
      error: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
  },
  computed: {
    ...mapGetters([
      'property',
      'timezone',
      'locale',
      'cadet'
    ]),
  },
  methods: {
    handleFileUpload: function() {
      this.error = null;
      this.file = this.$refs.file.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
          
          if(this.file.size > 4*1024*1024) {
            this.error = "Size of the image is more than 4MB";
          } else {
            this.imageData = e.target.result;
            this.is_photo_available = true;
          }
      }
      reader.readAsDataURL(this.file);
    },
    remove_photo: function() {
      this.file = '';
      this.imageData = '';
      this.is_photo_available = false;
    },
    add_photo_url: function(){
      this.$store.state.cadet['file'] = this.file;
      this.$router.push("/new_badge/choose_elf")
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
.user-photo-preview{
  border-radius: 0.8rem;
  box-shadow: 0 15px 0 rgba(0, 0, 0, 0.10);
  cursor: pointer;
  display: inline-block;
  margin-bottom: 20px;
  min-height: 161px;
  max-width: 160px;
  overflow: hidden;
  position: relative;
  width: 160px;
}
@media (min-width: 1025px) {
  .add-photo-container {
    margin-top: 24px !important;
  }
}
@media (max-width: 414px) {
  .add-photo-container {
    margin-top: 39px !important;
  }
}
@media (max-width: 768px) {
  .add-photo-container {
    margin-top: 86px !important;
    justify-content: start;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
    .add-photo-container {
      margin-top: 121px !important;
      justify-content: start;
    }
}
</style>