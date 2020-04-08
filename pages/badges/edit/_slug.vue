<template>
  <div>
    <!-- Cadet Builder -->
            <div>

                <!-- Edit -->
                <div id="box_cadet_edit" class="container box-home new-badge-container edit-badge-container">
                    <div class="app-edit-badge app-body-full col-sm-10 mx-auto">          
                        <div class="green-form wide" style="margin-bottom:30px">
                            <div class="row no-gutters py-2">
                                <div class="col-sm-5 text-center">                
                                    <div class="col-sm-10 mx-auto section-edit">
                                        <div class="row">                  
                                            <div class="col review-photo">
                                                <!-- <div class="review-photo-container" style="background-image: url({{cadet.pic.imageUrl}});"></div> -->
                                            </div>                
                                        </div>

                                        <div class="row">                  
                                            <div class="col review-retake">
                                                <a href id="btn_edit_badge_retake_photo" class="btn btn-outline-puti"><i class="fa fa-1x fa-camera"></i> Choose new photo</a>
                                            </div>                
                                        </div>

                                        <div class="row">                  
                                            <div class="col mx-auto review-rename">                    
                                                <div class="input-group semi-round green-box" style="padding:0;">
                                                    <span class="input-group-addon bg-light"><i class="fa fa-smile-o fa-2x"></i></span>
                                                    <!-- <input type="text" class="form-control icon-email" placeholder="{{cadet1.name}}" /> -->
                                                </div>                    
                                            </div>                
                                        </div>       
                                    </div>         
                                </div>
                                <div class="col-sm-4 text-center" >
                                    <div id="box_edit_badge_guides" class="col-sm-11 ml-0 section-edit section-helpers">
                                        <div class="section-title text-center">My guide</div>
                                        <div class="row">
                                            <div class="col"><div class="edit-guide edit-guide-1"></div></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6"><div class="edit-guide edit-guide-2"></div></div>
                                            <div class="col-sm-6"><div class="edit-guide edit-guide-3"></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div id="box_edit_badge_suits" class="col-sm-12 section-edit section-suits">
                                        <div class="section-title text-center">My suit</div>
                                        <div class="form-row">
                                            <div class="col-sm-6 text-center"><div class="edit-suits edit-suits-1"></div></div>
                                            <div class="col-sm-6 text-center"><div class="edit-suits edit-suits-2"></div></div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>

                        <div class="clearfix"></div>
                        <div class="app-step-btn text-center">
                            <nuxt-link to="/new_badge/preview" id="btn_edit_badge_preview" class="btn btn-step md">
                                <i class="fa fa-check"></i>
                                <span style="padding: 0 60px 0 40px;">Preview</span>
                            </nuxt-link>
                            <!-- this could be hidden when adding a new badge -->
                            <div>
                                <br/>
                                <nuxt-link to="/new_badge/preview" id="btn_edit_badge_cancel" style="color: #6abaad;"><i class="fa fa-times"></i> Cancel</nuxt-link>
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
.edit-badge-container {
    margin-top: 100px !important;
}
</style>