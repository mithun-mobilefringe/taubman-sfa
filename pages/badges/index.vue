<template>
  <div>
      <header-component :headerfile= headerFileName></header-component>
    
<div class="main main-1">

            <!-- Cadets List (All Done) -->
            <div id="box_home" class="container">
                <div class="app-title">
                    <img alt="" src="assets/img/t-your-badges.png" style="margin-top: 12px;" />
                </div>        
                <div class="app-body-full col-sm-9 mx-auto">         
                    <div class="page-instructions col-sm-6 mx-auto text-center pb-2">
                        <p>Visit The Mall at "ShortHills" to print your badge and experience Santa's Flight Academy.</p>
                        <p>Mon–Sat: 10:00am – 9:00pm<br/> Sundays: 11:00am – 6:00pm</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-8 badge-list">
                            <div class="green-form wide" style="margin-bottom:30px; padding:15px;">
                                <div class="row pb-3">
                                    <div class="col section-title">Your Badges</div>
                                    <div class="col section-title text-right"><a href id="btn_home_delete_all" class="text-green">Delete All</a></div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        
                                        <!-- Badge -->
                                        <div class="ubadge-item bg-green" data-id="1"><!-- please replace with actual IDs -->
                                            <div class="ubadge-picture">
                                                <div class="ubadge-picture-container" style="background-image: url({{ cadet.pic.imageUrl}});"></div>
                                            </div>
                                            <div class="ubadge-info">
                                                <strong>{{cadet1.name}} "{{cadet1.elf.name}}"</strong><br/>
                                                {{cadet1.elf.specialty}}
                                            </div>
                                            <div class="ubadge-action">
                                                <a href class="ubadge-button-edit"><i class="fa fa-2x fa-pencil"></i></a><br/>
                                                <a href class="ubadge-button-delete"><i class="fa fa-2x fa-times"></i></a>
                                            </div>    
                                        </div>
                                        <!-- /Badge -->
                                        
                                        <!-- Badge -->
                                        <div class="ubadge-item bg-green" data-id="2"><!-- please replace with actual IDs -->
                                            <div class="ubadge-picture">
                                                <div class="ubadge-picture-container" style="background-image: url({{ cadet.pic.imageUrl}})"></div>
                                            </div>
                                            <div class="ubadge-info">
                                                <strong>{{cadet2.name}} "{{cadet2.elf.name}}"</strong><br/>
                                                {{cadet2.elf.specialty}}
                                            </div>
                                            <div class="ubadge-action">
                                                <a href class="ubadge-button-edit"><i class="fa fa-2x fa-pencil"></i></a><br/>
                                                <a href class="ubadge-button-delete"><i class="fa fa-2x fa-times"></i></a>
                                            </div>    
                                        </div>
                                        <!-- /Badge -->
                                        
                                    </div>
                                </div>
                            </div>                 
                        </div>

                        <div class="col-sm-4 signup-express">
                            <div class="create-badge">
                                <a href id="btn_home_create_badge">
                                    <i class="tiny-elf"></i> <i class="plus-sign"></i>
                                    <span class="create-badge-text">Create new <br/>badge</span>
                                </a>
                            </div>
                            <div class="red-box">
                                <h3>Skip the long lines!</h3>
                                <p style="padding:10px 0;">See Santa sooner by pre-purchasing your Santa Photo Package online.</p>
                                <a href id="btn_home_fast_pass" class="btn btn-white" style="color: white;">Sign up for <br/>Santa’s Express Lane</a>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <!-- Delete Modal -->
                <div id="box_delete_modal" style="display: none;">
                    <div class="modal-backdrop fade show"></div>
                    <div id="myModal" class="modal fade elfmodal" role="dialog" style="display: block; opacity: 1; margin-top: 82px;">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="elfhead" style="height:190px;"></div>
                            <div class="modal-content">        
                                <div class="modal-body">
                                    <div class="row"><div class="col modal-text"><strong>{{delete.message}}</strong></div></div>
                                    <div class="row"><div class="col"><a href id="btn_home_delete_confirm" class="btn btn-step">Yes, Delete</a></div></div>
                                    <div class="row"><div class="col"><a href id="btn_home_delete_cancel" class="btn btn-step white">No, Cancel</a></div></div>
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <a href id="btn_choose_guide_sparkle" class="btn-choose-guide btn btn-step md" style="width: 200px;"><i class="fa fa-check"></i> Done</a>
                </div>
                <!-- /Delete Modal -->
            </div>
            <!-- /Cadets List -->
        </div>


  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import tz from 'moment-timezone'
export default {
  head() {
  },
  components: {
    headerComponent: () => import("~/components/headerComponent.vue")
  },
  data: function() {
    return {
        headerFileName: require("~/assets/img/t-join-crew.png")
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  created() {
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
  methods: {
  }
}
</script>
<style>
</style>