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
                                        <!-- <div class="id-badge-img">
                                            <div class="id-badge-img-container" style="background-image: url({{ cadet.pic.imageUrl}});"></div>
                                        </div>
                                        <div class="id-badge-name"><span>{{cadet.name}}</span></div>
                                        <div class="id-badge-codename"><span>"{{elf.name}}"</span></div>
                                        <div class="id-badge-specialty"><span>{{elf.specialty}}</span></div>
                                        <div class="id-badge-mall"><span>{{mall}}</span></div> -->
                                    </div>
                                </div>
                            </div>                 
                            <div class="app-checkbox final-box clearfix">
                                <div class="form-check">              
                                    <input type="checkbox" id="chk_agree_terms_badge_approve" class="app-check-input" />
                                    <label class="app-check-label" for="chk_agree_terms_badge_approve">
                                        <span>I have read and agree to the <a href="#" style="color: white;">Terms</a> and understand my information will be used in accordance with the <a href="#" style="color: white;">Privacy Policy</a></span>
                                    </label>
                                </div>
                            </div>
                            <div id="box_cadet_preview_error" class="form-row" style="display: none;">
                                <div class="form-group col">
                                    <div class="form-error">You must agree to the Terms and understand the Privacy Policy to proceed!</div>
                                </div>
                            </div>
                        </div>   
                        <div class="clearfix"></div>
                        <div class="app-step-btn text-center">
                            <nuxt-link to="/badges" id="btn_badge_preview_approve" class="btn btn-step md"><i class="fa fa-check"></i> Approve Badge</nuxt-link>
                            <nuxt-link to="/badges/edit/1" id="btn_badge_preview_edit" class="btn btn-outline-green"><i class="fa fa-pencil"></i> Edit Badge</nuxt-link>
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
.preview-box {
    margin-top: 60px;
    width: 570px;
}
@media (min-width:769px) and (max-width:1025px) {
    .preview-box {
    margin-top: 170px;
    min-height: 65vh;
}
}
</style>