<template>
  <div>
    <!-- Cadet Builder -->
            <div>

                <!-- Enter Name -->
                <div id="box_cadet_enter_name" class="container box-home new-badge-container name-new-badge-container">
                    <div class="step step-1">
                        
                    </div>  
                    <div class="col-sm-6 mx-auto">
                        <h2 class="app-lead">{{$t('new_badge.heading')}}</h2>
                        <div class="no-form">           
                            <div class="form-row">
                                <div class="form-group col">
                                    <div class="input-group semi-round green-box" style="padding:0px;">
                                        <span class="input-group-addon bg-light"><i class="fa fa-smile-o fa-2x"></i></span>
                                        <input type="text" id="txt_create_badge_name" v-model="cadetName" class="form-control icon-email" placeholder="Please enter cadet's first name" />  
                                    </div>
                                </div>
                            </div>
                            <div id="box_create_badge_name_error" class="form-row" v-if="errors.length > 0">
                                <div class="form-group col">
                                    <div class="form-error" id="invalid-name">{{$t('error.invalid_name')}}</div>
                                    <!-- <div class="form-error" id="invalid-length">{{$t('error.invalid_name_length')}}</div> -->
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col green-text">{{$t('new_badge.add_later')}}</div>
                            </div>          
                            <div class="clearfix"></div>
                            <div class="app-step-btn text-right">
                              <button id="btn_create_badge_name_next" class="btn btn-step" @click="saveName()">{{$t('app.next')}}</button>
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
      errors: [],
      cadetName: ""
    };
  },
  created() {
      this.$store.state.headerfile = require("~/assets/img/t-create-badge.png")
  },
  computed: {
    ...mapGetters([
      'property',
      'timezone',
      'locale'
    ]),
  },
  methods: {
    saveName: function () {
      this.errors = [];
      if(this.cadetName.length > 0){
        let cadet = {};
        cadet['short_name'] = this.cadetName;
        this.$store.state.cadet = cadet;
        this.$router.push('/new_badge/pick_suit');
      } else {
        this.errors.push('Please Enter your Name');
      }
    }
  }
};
</script>
<style>
@media (min-width: 1025px){
    .name-new-badge-container {
        margin-top: 8px;
}
}

</style>