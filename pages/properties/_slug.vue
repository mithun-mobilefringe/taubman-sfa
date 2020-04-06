<template>
  <div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import tz from 'moment-timezone'
export default {
  head() {
  },
  data: function() {
    return {
      property_id: "",
      property: null
    }
  },
  components: {
    //SocialSharing: () => import('vue-social-sharing'),
  },
  created() {
    this.property_id = this.$route.params.slug;
    console.log("property id in slug : " + this.property_id);
    let path = "/get_property/?property_id=" + this.property_id;
          this.$store.dispatch("getRequest", {
              path: path
          }).then(response => {
              this.property = response.data;
              this.$store.state.property = this.property;
              this.$router.push('/');
          }, (error) => { 
            console.log("Error: " + error);
              //this.handleError(error,{type:'API',request:'getRequest',path:path});
          });
  },
  computed: {
    /* ...mapGetters([
      'property',
      'processedEvents',
      'findEventBySlug',
      'findEventById',
      'timezone',
      'findRepoByName',
      'findHourById',
      'locale'
    ]), */
  },
  methods: {
  }
}
</script>