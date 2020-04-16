<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Edit -->
      <div id="box_cadet_edit" class="container box-home new-badge-container">
        <div
          class="app-edit-badge app-body-full col-sm-10 mx-auto edit-badge-container"
          v-if="badge"
        >
          <div class="green-form wide" style="margin-bottom:30px">
            <div class="row no-gutters py-2">
              <div class="col-sm-5 text-center">
                <div class="col-sm-10 mx-auto section-edit">
                  <div class="row">
                    <div style="display:none;">{{badge.imageURL}} - {{is_photo_updated}}</div>
                    <div
                      class="col review-photo"
                      v-if="badge.imageURL"
                      :class="{'add-opacity': choose_new_photo}"
                    >
                      <div
                        class="review-photo-container"
                        :style="`background-image: url({{badge.imageURL}});`"
                      ></div>
                    </div>
                    <div
                      class="col edit-review-photo"
                      :class="{'add-opacity': choose_new_photo}"
                      v-else
                    >
                      <div
                        class="review-photo-container"
                        v-if="edit_id == 'new_badge'"
                        style="height: 100%"
                      >
                        <img :src="imageData" style="height: 100%" />
                      </div>
                      <div class="review-photo-container" style="height: 100%" v-else>
                        <img :src="badge.picture_url" style="height: 100%" />
                      </div>
                    </div>

                    <div class="img-uploader col" v-if="choose_new_photo">
                      <div
                        id="box_photo_uploader col"
                        class="photo-box"
                        data-upload-url="http://sfa.projects.extanet.com"
                      >
                        <div class="fallback" v-if="!is_photo_updated">
                          <input
                            name="new_file"
                            type="file"
                            ref="new_file"
                            accept="image/*"
                            capture="camera"
                            v-on:change="handleFileUpload()"
                          />
                        </div>
                        <div
                          class="review-photo-container"
                          v-if="is_photo_updated"
                          style="height: 100%"
                        >
                          <img :src="new_imageData" style="height: 100%" />
                        </div>
                      </div>

                      <a
                        id="btn_edit_badge_cancel_retake_photo"
                        class="btn btn-outline-puti"
                        @click="cancelSelectionPhoto()"
                        v-if="!badge.picture_url"
                      >
                        <i class="fa fa-1x fa-times"></i> Cancel
                      </a>

                      <a
                        id="btn_edit_badge_use_original_photo"
                        class="btn btn-outline-puti"
                        @click="cancelSelectionPhoto()"
                        v-if="badge.picture_url"
                      >
                        <i class="fa fa-1x fa-refresh"></i> Use Original
                      </a>
                    </div>
                  </div>

                  <div class="row" v-if="!choose_new_photo">
                    <div class="col review-retake">
                      <a
                        id="btn_edit_badge_retake_photo"
                        class="btn btn-outline-puti"
                        @click="chooseNewPhoto()"
                      >
                        <i class="fa fa-1x fa-camera"></i> Choose new photo
                      </a>
                    </div>
                  </div>

                  <div class="row" v-if="!badge.imageURL && !choose_new_photo">
                    <div class="col review-retake">
                      <a
                        id="btn_edit_badge_retake_photo"
                        class="btn btn-outline-puti"
                        @click="dontUsePhoto()"
                      >
                        <i class="fa fa-1x fa-times"></i> Don't use a Photo
                      </a>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col mx-auto review-rename">
                      <div class="input-group semi-round green-box" style="padding:0;">
                        <span class="input-group-addon bg-light">
                          <i class="fa fa-smile-o fa-2x"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control icon-email txt-name"
                          placeholder="Please enter cadet's first name"
                          v-model="badge.short_name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 text-center">
                <div id="box_edit_badge_guides" class="col-sm-11 ml-0 section-edit section-helpers">
                  <div class="section-title text-center">My guide</div>
                  <div class="row">
                    <div class="col">
                      <div
                        class="edit-guide edit-guide-1"
                        :class="{'active':(this.badge.characterObj.id === 1)}"
                        @click="changeGuide(0)"
                      ></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div
                        class="edit-guide edit-guide-2"
                        :class="{'active':(this.badge.characterObj.id === 2)}"
                        @click="changeGuide(1)"
                      ></div>
                    </div>
                    <div class="col-sm-6">
                      <div
                        class="edit-guide edit-guide-3"
                        :class="{'active':(this.badge.characterObj.id === 3)}"
                        @click="changeGuide(2)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div id="box_edit_badge_suits" class="col-sm-12 section-edit section-suits">
                  <div class="section-title text-center">My suit</div>
                  <div class="form-row">
                    <div class="col-sm-6 text-center">
                      <div
                        class="edit-suits edit-suits-1"
                        :class="{'active':(this.badge.suit === 'boy')}"
                        @click="changeSuit('boy')"
                      ></div>
                    </div>
                    <div class="col-sm-6 text-center">
                      <div
                        class="edit-suits edit-suits-2"
                        :class="{'active':(this.badge.suit === 'girl')}"
                        @click="changeSuit('girl')"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div v-if="edit_id !='new_badge'">
              <button
                id="btn_edit_badge_preview"
                class="btn btn-step md"
                @click="editBadgeFormData()"
              >
                <i class="fa fa-check"></i>
                <span style="padding: 0 60px 0 40px;">Save</span>
              </button>
            </div>
            <!-- this could be hidden when adding a new badge -->
            <div v-if="edit_id=='new_badge'">
              <button
                id="btn_edit_badge_preview"
                class="btn btn-step md"
                @click="editBadgeFormData()"
              >
                <i class="fa fa-check"></i>
                <span style="padding: 0 60px 0 40px;">Preview</span>
              </button>
            </div>
            <div>
              <a id="btn_edit_badge_cancel" class="btn_edit_badge_cancel" @click="cancelEdit()">
                <i class="fa fa-times"></i> Cancel
              </a>
            </div>
            <!-- /this could be hidden when adding a new badge -->
          </div>
        </div>
      </div>
      <!-- /Edit -->
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
      badge: null,
      edit_id: null,
      imageData: "",
      is_photo_updated: false,
      choose_new_photo: false,
      new_file: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.loadData();
  },
  computed: {
    ...mapGetters(["property", "timezone", "locale", "cadet", "characters","email"])
  },
  methods: {
    loadData: function() {
      this.edit_id = this.$route.params.badgeid;
      if (this.edit_id == "new_badge") {
        this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
        this.badge = { ...this.cadet };
        this.badge["characterObj"] = this.badge.character;
        this.badge["short_name"] = this.badge.short_name;
        if (this.badge && this.badge["file"]) {
          this.loadImage();
        }
      } else {
        this.$store.state.headerfile = require("~/assets/img/t-edit-badge.png");
        this.getBadge();
      }
    },
    loadImage: function() {
      this.file = this.cadet.file;
      var reader = new FileReader();
      reader.onload = e => {
        this.imageData = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    handleFileUpload: function() {
      this.error = null;
      this.new_file = this.$refs.new_file.files[0];
      var reader = new FileReader();
      reader.onload = e => {
        if (this.new_file.size > 4 * 1024 * 1024) {
          this.error = "Size of the image is more than 4MB";
        } else {
          this.new_imageData = e.target.result;
          this.is_photo_updated = true;
        }
      };
      reader.readAsDataURL(this.new_file);
    },
    changeGuide: function(id) {
      this.badge.characterObj = this.characters[id];
      this.badge.character = this.characters[id].character_name;
    },
    getClassForSuits: function(suitType) {
      if (this.badge.suit == suitType) {
        return "active";
      }
    },
    changeSuit: function(suitType) {
      this.badge.suit = suitType;
    },
    getBadge: function() {
      let path = "/get_badge";
      let data = {
        badge_id: this.$route.params.badgeid
      };
      this.postMethod(path, data).then(
        response => {
          let badgeData = response.data.data;
          badgeData["characterObj"] = this.getCharacterFromName(
            badgeData.character
          );
          if (badgeData.picture_url == null) {
            badgeData[
              "imageURL"
            ] = require("~/assets/img/elfPhotoPlaceholder_160.png");
          }
          this.badge = badgeData;
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    editBadgeFormData: function() {
      if (this.edit_id == "new_badge") {
        this.$store.state.cadet = this.badge;
        this.$store.state.cadet["character"] = this.badge.characterObj;
        if (this.is_photo_updated) {
          this.$store.state.cadet["file"] = this.new_file;
        }
        this.$router.push("/new_badge/preview");
      } else {
        if (this.is_photo_updated) {
          if(this.new_file) {

          
          var path = "/add_picture";
          let formData = new FormData();

          formData.append("file", this.new_file);
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
              this.badge["picture_url"] = response.data.data.picture_url;
              this.editBadge();
            })
            .catch(function() {
              console.log("FAILURE!!");
            });
            } else {
              this.badge["picture_url"] = null;
              this.editBadge();
            }
        } else {
          this.editBadge();
        }
      }
    },
    editBadge: function() {
      let path = "/edit_badge";
      this.postMethod(path, this.badge).then(
        response => {
          this.updateProfile(response.data.data);
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    updateProfile: function(responseBadge) {
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
    },
    dontUsePhoto: function() {
      this.is_photo_updated = true;
      this.badge.imageURL = require("~/assets/img/elfPhotoPlaceholder_160.png");
    },
    chooseNewPhoto: function() {
      this.choose_new_photo = true;
      this.is_photo_updated = false;
    },
    cancelSelectionPhoto: function() {
      this.choose_new_photo = false;
      this.is_photo_updated = false;
    },
    cancelEdit: function() {
      if (this.edit_id == "new_badge") {
        this.$router.push("/new_badge/preview");
      } else {
        this.$router.push("/badges");
      }
    }
  },
  mounted() {}
};
</script>
<style>
.edit-badge-container {
  margin-top: 100px !important;
  z-index: 1 !important;
}
.txt-name {
  padding-left: 5px !important;
}
.btn_edit_badge_cancel {
  cursor: pointer !important;
  color: #6abaad !important;
}
.edit-review-photo {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 200px;
  flex-grow: 0;
  height: 200px;
  margin: auto auto 20px auto;
  width: 200px;
}
.img-uploader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-opacity {
  opacity: 0.5;
}
</style>