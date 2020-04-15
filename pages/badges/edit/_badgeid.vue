<template>
  <div>
    <!-- Cadet Builder -->
    <div>
      <!-- Edit -->
      <div id="box_cadet_edit" class="container box-home new-badge-container">
        <div class="app-edit-badge app-body-full col-sm-10 mx-auto edit-badge-container" v-if="badge">
          <div class="green-form wide" style="margin-bottom:30px">
            <div class="row no-gutters py-2">
              <div class="col-sm-5 text-center">
                <div class="col-sm-10 mx-auto section-edit">
                  <div class="row">
                    <div class="col review-photo">
                      <div
                        class="review-photo-container"
                        :style="`background-image: url({{badge.imageURL}});`"
                      ></div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col review-retake">
                      <a href id="btn_edit_badge_retake_photo" class="btn btn-outline-puti">
                        <i class="fa fa-1x fa-camera"></i> Choose new photo
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
                      <div class="edit-guide edit-guide-1" :class="{'active':(this.badge.characterObj.id === 1)}" @click="changeGuide(0)"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="edit-guide edit-guide-2" :class="{'active':(this.badge.characterObj.id === 2)}" @click="changeGuide(1)"></div>
                    </div>
                    <div class="col-sm-6">
                      <div class="edit-guide edit-guide-3" :class="{'active':(this.badge.characterObj.id === 3)}" @click="changeGuide(2)"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div id="box_edit_badge_suits" class="col-sm-12 section-edit section-suits">
                  <div class="section-title text-center">My suit</div>
                  <div class="form-row">
                    <div class="col-sm-6 text-center">
                      <div class="edit-suits edit-suits-1" :class="{'active':(this.badge.suit === 'boy')}" @click="changeSuit('boy')"></div>
                    </div>
                    <div class="col-sm-6 text-center">
                      <div class="edit-suits edit-suits-2" :class="{'active':(this.badge.suit === 'girl')}" @click="changeSuit('girl')"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div v-if="edit_id !='new_badge'">
            <button id="btn_edit_badge_preview" class="btn btn-step md" @click="editBadge()">
              <i class="fa fa-check"></i>
              <span style="padding: 0 60px 0 40px;">Save</span>
            </button>
            </div>
            <!-- this could be hidden when adding a new badge -->
            <div v-if="edit_id=='new_badge'">
            <button id="btn_edit_badge_preview" class="btn btn-step md" @click="editBadge()">
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
      edit_id: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.loadData();
  },
  computed: {
    ...mapGetters(["property", "timezone", "locale", "cadet", "characters"])
  },
  methods: {
    loadData: function() {
      this.edit_id = this.$route.params.badgeid;
      if (this.edit_id == "new_badge") {
        this.$store.state.headerfile = require("~/assets/img/t-create-badge.png");
        this.badge = {...this.cadet};
        this.badge['characterObj'] = this.badge.character;
        this.badge['short_name'] = this.badge.name;
      } else {
        this.$store.state.headerfile = require("~/assets/img/t-edit-badge.png");
        this.getBadge();
      }
    },
    changeGuide: function(id){
      this.badge.characterObj = this.characters[id];
      this.badge.character = this.characters[id].character_name;
      
    },
    getClassForSuits: function(suitType) {
        if(this.badge.suit == suitType) {
            return "active";
        }
    },
    changeSuit: function(suitType){
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
          this.badge = badgeData;
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    editBadge: function() {
      if(this.edit_id == "new_badge") {
        this.$store.state.cadet = this.badge;
        this.$store.state.cadet['character'] = this.badge.characterObj;
        this.$router.push("/new_badge/preview");
      } else {
        let path = "/edit_badge";
      this.postMethod(path, this.badge).then(
        response => {
          this.updateProfile(response.data.data);
          this.$router.push("/badges");
        },
        error => {
          console.log("Error: " + error);
        }
      );
      }
      
    },
    updateProfile: function(responseBadge) {
      let profile = this.$cookies.get("taubman-profile");
      let badges = profile['badges'];
      for(let index in badges) {
        if(badges[index].id = responseBadge.id) {
          responseBadge['taubman_character_id'] = this.getCharacterFromName(responseBadge.character).id;
          profile.badges[index] = responseBadge;
          break;
        }
      }
      this.$cookies.set("taubman-profile", profile);
      this.$store.state.profile = profile;
    },
    cancelEdit: function() {
        if(this.edit_id == "new_badge") {
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
</style>