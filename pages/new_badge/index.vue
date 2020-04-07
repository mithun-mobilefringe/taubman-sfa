<template>
  <div>
    <!-- Cadet Builder -->
            <div>

                <!-- Enter Name -->
                <div id="box_cadet_enter_name" class="container box-home new-badge-container">
                    <div class="step step-1">
                        
                    </div>  
                    <div class="col-sm-6 mx-auto">
                        <h2 class="app-lead">{{$t('new_badge.heading')}}</h2>
                        <div class="no-form">           
                            <div class="form-row">
                                <div class="form-group col">
                                    <div class="input-group semi-round green-box">
                                        <span class="input-group-addon bg-light py-2"><i class="fa fa-smile-o fa-2x"></i></span>
                                        <input type="text" id="txt_create_badge_name" class="form-control py-2 icon-email" placeholder="Please enter cadet's first name" />  
                                    </div>
                                </div>
                            </div>
                            <div id="box_create_badge_name_error" class="form-row" style="display: none;">
                                <div class="form-group col">
                                    <div class="form-error" id="invalid-name">{{$t('error.invalid_name')}}</div>
                                    <div class="form-error" id="invalid-length">{{$t('error.invalid_name_length')}}</div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col green-text">{{$t('new_badge.add_later')}}</div>
                            </div>          
                            <div class="clearfix"></div>
                            <div class="app-step-btn text-right">
                                <nuxt-link to="/new_badge/pick_suit" id="btn_create_badge_name_next" class="btn btn-step">
                                {{$t('app.next')}}
                                </nuxt-link>
                            </div>
                        </div>          
                    </div>
                </div>
                <!-- /Enter Name -->

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
  },
  data: function() {
    return {
      
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
      this.$store.state.headerfile = require("~/assets/img/t-create-badge.png")
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
    white-space:normal !important;
    word-wrap: break-word; 
}
.create-badge-link {
    display: flex;
    cursor: pointer;
}
</style>