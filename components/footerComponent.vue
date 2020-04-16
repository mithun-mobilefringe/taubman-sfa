<template>
  <div>
    <div class="before-footer">
    </div>
    <div class="footer text-center" v-if="property">
      <a :href="getURL(1)" target="_blank">More Details</a>
      <a :href="getURL(2)" target="_blank">Terms</a>
      <a :href="getURL(3)" target="_blank">Privacy</a>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import tz from "moment-timezone";
import { mapGetters } from "vuex";

export default {
  transition: "page",
  components: {
    //SocialLinks: () => import("~/components/socialLinks.vue")
  },
  data: function() {
    return {
      
    }
  },
  watch: {
    $route() {
      // Close the mobile menu when navigating to new page
      //this.show_mobile_links = false;
    }
  },
  computed: {
    ...mapGetters(["property"]),
  },
  methods: {
    getURL(id) {
      if(id == 1) {
        return this.property.url + '/holiday_details';
      } else if(id == 2) {
        return this.property.url + '/terms_of_service';
      } else if(id == 3) {
        return this.property.url + '/privacy_policy';
      }
    }
  }
};
</script>