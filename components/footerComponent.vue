<template>
  <div>
    <div class="before-footer">
    </div>
    <div class="footer text-center">
      <a href="#">More Details</a>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
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
    //...mapGetters(["property", "timezone", "findRepoByName"]),
  },
  methods: {
  }
};
</script>