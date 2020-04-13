<template>
  <div>
    <!-- Cadets List (All Done) -->
    <div id="box_home" class="container box-home">
      <div class="app-body-full col-sm-9 mx-auto">
        <div class="page-instructions col-sm-6 mx-auto text-center pb-2">
          <p>Visit The Mall at ShortHills</p>
          <p>
            Mon–Sat: 10:00am – 9:00pm
            <br />Sundays: 11:00am – 6:00pm
          </p>
        </div>
        <div class="row">
          <div class="col-sm-8 badge-list">
            <div class="green-form wide" style="margin-bottom:30px; padding:15px;">
              <div class="row pb-3">
                <div class="col section-title">{{$t('badges.badges_txt')}}</div>
                <div class="col section-title text-right">
                  <a href id="btn_home_delete_all" class="text-green">{{$t('badges.delete_all')}}</a>
                </div>
              </div>
              <div class="row" v-if="badges">
                <div class="col">
                  <!-- Badge -->
                  <div v-for="badge in badges" :key=badge.id>
                  <div class="ubadge-item bg-green" data-id="1">
                    <!-- please replace with actual IDs -->
                    <div class="ubadge-picture">
                      <!-- <div class="ubadge-picture-container" style="background-image: url({{ cadet.pic.imageUrl}});"></div> -->
                    </div>
                    <div class="ubadge-info">
                      <p><strong>
                        {{badge.short_name}} {{badge.codename}}
                        <!-- {{cadet1.name}} "{{cadet1.elf.name}}" -->
                      </strong></p>
                      <p style="text-align: justify;"><strong>{{getCharacterName(badge.taubman_character_id-1)}}</strong></p>
                      <!-- {{cadet1.elf.specialty}} -->
                    </div>
                    <div class="ubadge-action">
                      <a href class="ubadge-button-edit">
                        <i class="fa fa-2x fa-pencil"></i>
                      </a>
                      <br />
                      <a href class="ubadge-button-delete">
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
                <span class="create-badge-text">
                  {{$t('badges.create_badge')}}
                </span>
                </nuxt-link>
            </div>
            <div class="red-box">
              <h3>{{$t('badges.skip_line_heading')}}</h3>
              <p
                style="padding:10px 0;"
              >{{$t('badges.skip_line_text')}}</p>
              <a href id="btn_home_fast_pass" class="btn btn-white btn-home-fast-pass" style="color: white;">
                {{$t('badges.skip_line_button')}}
              </a>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>

      <!-- Delete Modal -->
      <div id="box_delete_modal" style="display: none;">
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
                    <a href id="btn_home_delete_confirm" class="btn btn-step">Yes, Delete</a>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <a href id="btn_home_delete_cancel" class="btn btn-step white">No, Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center btn-margin-top">
        <a
          href
          id="btn_choose_guide_sparkle"
          class="btn-choose-guide btn btn-step md"
        >
          <i class="fa fa-check"></i>  Back to The Mall at Short Hills
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
  components: {
  },
  data: function() {
    return {
      badges: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.state.headerfile = require("~/assets/img/t-your-badges.png");
    debugger;
    this.loadData();
      
  },
  computed: {
    ...mapGetters([
      'property',
      'timezone',
      'locale',
      'email',
      'is_new_profile',
      'characters'
    ])
  },
  methods: {
    loadData: function () {
      this.profile = this.$cookies.get("taubman-profile");
      if(this.profile) {
        this.badges = this.profile.badges;
      }
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
    white-space:normal !important;
    word-wrap: break-word; 
}
.create-badge-link {
    display: flex;
    cursor: pointer;
}
.btn-margin-top{
  margin-top: 20px;
}
</style>