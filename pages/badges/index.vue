<template>
  <div>
    <!-- Cadets List (All Done) -->
    <div id="box_home" class="container box-home badge-list-box-home">
      <div class="app-body-full col-sm-9 mx-auto">
        <div class="page-instructions col-sm-6 mx-auto text-center pb-2">
          <p>Visit {{property.name}} to print your badge and experience Santa's Flight Academy.</p>
          <div v-if="regHours.length>0">
            <div v-for="(reghour,i) in regHours" :key="i" class="mall-hours">
              <div class="mall-hours-days">{{days[i]}}:</div>
              <div>{{reghour}}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8 badge-list">
            <div class="green-form wide" style="margin-bottom:30px; padding:15px;">
              <div class="row pb-3">
                <div class="col section-title">{{$t('badges.badges_txt')}}</div>
                <div class="col section-title text-right">
                  <a
                    id="btn_home_delete_all"
                    class="text-green btn"
                    @click="toggleDeleteModalDisplay()"
                  >{{$t('badges.delete_all')}}</a>
                </div>
              </div>
              <div class="row" v-if="badges">
                <div class="col">
                  <!-- Badge -->
                  <div v-for="badge in badges" :key="badge.id">
                    <div class="ubadge-item bg-green" data-id="1">
                      <!-- please replace with actual IDs -->
                      <div v-if="!badge.picture_url" class="ubadge-picture"></div>
                      <div v-if="badge.picture_url" class="ubadge-picture-container">
                        <img :alt="badge.short_name" :src="badge.picture_url" class="badge-picture" />
                      </div>
                      <div class="ubadge-info" @click="viewBadge(badge.id)">
                        <p>
                          <strong>{{badge.short_name}} {{badge.codename}}</strong>
                        </p>
                        <p style="text-align: justify;">
                          <strong>{{getCharacterName(badge.taubman_character_id-1)}}</strong>
                        </p>
                      </div>
                      <div class="ubadge-action">
                        <nuxt-link class="ubadge-button-edit btn" :to="getEditURL(badge.id)">
                          <i class="fa fa-2x fa-pencil"></i>
                        </nuxt-link>
                        <br />
                        <a
                          class="ubadge-button-delete btn"
                          @click="toggleDeleteModalDisplay(badge.id)"
                        >
                          <i class="fa fa-2x fa-times"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- /Badge -->
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-4 signup-express">
            <div class="create-badge">
              <nuxt-link to="/new_badge" id="btn_home_create_badge" class="create-badge-link">
                <i class="tiny-elf"></i>
                <i class="plus-sign"></i>
                <span class="create-badge-text">{{$t('badges.create_badge')}}</span>
              </nuxt-link>
            </div>
            <div class="red-box">
              <h3>{{$t('badges.skip_line_heading')}}</h3>
              <p style="padding:10px 0;">{{$t('badges.skip_line_text')}}</p>
              <a
                :href="getSkipLineLink()"
                id="btn_home_fast_pass"
                class="btn btn-white btn-home-fast-pass"
                style="color: white;"
              >{{$t('badges.skip_line_button')}}</a>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>

      <!-- Delete Modal -->
      <div id="box_delete_modal" v-if="delete_modal">
        <div class="modal-backdrop fade show"></div>
        <div
          id="myModal"
          class="modal fade elfmodal"
          role="dialog"
          style="display: block; opacity: 1; margin-top: 82px;"
        >
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="elfhead" style="height:190px;"></div>
            <div class="modal-content">
              <div class="modal-body">
                <div class="row">
                  <div class="col modal-text">
                    <strong>{{$t('badges.delete_message')}}</strong>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <button
                      id="btn_home_delete_confirm"
                      class="btn btn-step"
                      @click="deleteBadge()"
                    >{{$t('badges.yes_delete')}}</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <a
                      id="btn_home_delete_cancel"
                      class="btn btn-step white"
                      @click="toggleDeleteModalDisplay()"
                    >{{$t('badges.no_cancel')}}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center btn-margin-top">
        <a
          :href="property.url"
          id="btn_choose_guide_sparkle"
          class="btn-choose-guide btn btn-step md"
        >
          <i class="fa fa-check"></i>
          Back to {{property.name}}
        </a>
      </div>
      <!-- /Delete Modal -->
    </div>
    <!-- /Cadets List -->
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
      badges: [],
      delete_modal: false,
      badge_id_to_be_deleted: null,
      hours: null,
      regHours: [],
      days: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-your-badges.png");
  },
  computed: {
    ...mapGetters([
      "property",
      "timezone",
      "locale",
      "email",
      "is_new_profile",
      "characters",
      "profile"
    ])
  },
  methods: {
    loadData: function() {
      this.updateProfile();
      this.loadHours();
    },
    loadHours: function() {
      let path = "/get_mall_hours";
      let data = {};
      this.postMethod(path, data).then(
        response => {
          this.getMallHours(response.data.data.hours);
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    getMallHours: function(hours) {
      hours.forEach(hour => {
        if (this.regHours.length === 0) {
          this.regHours.push(hour.hours);
          this.days.push(hour.day_of_week);
        } else {
          if (this.regHours.indexOf(hour.hours) < 0) {
            this.regHours.push(hour.hours);
            this.days.push(hour.day_of_week);
          } else {
            this.days[this.regHours.indexOf(hour.hours)] = this.days[
              this.regHours.indexOf(hour.hours)
            ]
              .concat(",")
              .concat(hour.day_of_week);
          }
        }
      });
      this.loadMallHours();
    },

    loadMallHours: function() {
      for (let i = 0; i < this.regHours.length; i++) {
        if (this.days[i].indexOf(",") >= 0) {
          let splitDays = this.days[i].split(",");
          this.days[i] = splitDays[0] + " - " + splitDays[splitDays.length - 1];
        } else {
          this.days[i] = this.days[i].concat("days");
        }
        this.regHours[i] = this.regHours[i].replace("to", "-");
      }
    },
    viewBadge: function(id) {
      let nextPageURL = "/badges/view/" + id;
      this.$router.push(nextPageURL);
    },
    deleteBadge: function() {
      debugger;
      if (this.badge_id_to_be_deleted) {
        let path = "/delete_badge";
        let data = {
          badge_id: this.badge_id_to_be_deleted
        };
        this.postMethod(path, data).then(
          response => {
            this.badge_id_to_be_deleted = null;
            this.delete_modal = !this.delete_modal;
            this.updateProfile();
          },
          error => {
            console.log("Error: " + error);
          }
        );
      } else {
        this.deleteAllBadge();
      }
    },
    deleteAllBadge: function() {
      let path = "/delete_all_badges";
      let data = {
        'profile_id': this.profile.profile_id
      };
      this.postMethod(path, data).then(
        response => {
          this.badge_id_to_be_deleted = null;
          this.delete_modal = !this.delete_modal;
          this.updateProfile();
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    toggleDeleteModalDisplay: function(id) {
      if (id) {
        this.badge_id_to_be_deleted = id;
      }
      this.delete_modal = !this.delete_modal;
    },
    updateProfile: function() {
      let path = "/get_profile_by_email";
      let data = {
        email: this.email
      };
      this.postMethod(path, data).then(
        response => {
          var profile = response.data.data;
          if (profile) {
            this.$store.state.profile = profile;
            this.$store.state.is_new_profile = false;
            this.badges = profile.badges;
          }
        },
        error => {
          console.log("Error: " + error);
        }
      );
    },
    getEditURL: function(id) {
      return "/badges/edit/" + id;
    },
    getImageURL: function() {
      return this.badge.picture_url;
    },
    getSkipLineLink: function() {
      if(this.property.meta_data && JSON.parse(this.property.meta_data).SFA && JSON.parse(this.property.meta_data).SFA.skip_line_link) {
        return JSON.parse(this.property.meta_data).SFA.skip_line_link;
      } else {
        return null;
      }
      
    }
  },
  beforeMount() {
    this.loadData();
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
.btn-margin-top {
  margin-top: 20px;
}
.ubadge-button-delete,
.ubadge-button-edit {
  padding: 0px;
}
.badge-picture {
  background-position: 50% center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 70px;
  left: 5px;
  overflow: hidden;
  position: absolute;
  top: 5px;
  width: 55px;
}
.mall-hours {
  display: flex;
  justify-content: center;
}
.mall-hours-days {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
@media (min-width: 1025px) {
  .badge-list-box-home {
    margin-top: 100px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .badge-list-box-home {
    margin-top: 121px !important;
  }
}
</style>