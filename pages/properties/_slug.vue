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
    let ppt = this.$cookies.get("taubman-property");
    if(ppt) {
      this.$store.state.property = ppt;
    } else {
      this.property_id = this.$route.params.slug;
      let path = "/get_property/?property_id=" + this.property_id;
          this.$store.dispatch("getRequest", {
              path: path
          }).then(response => {
              this.property = response.data;
              this.$store.state.property = this.property;
              this.$cookies.set("taubman-property", this.property);
              this.getCharacters();
              this.$store.state.locale = this.$i18n.locale;
              if(this.$cookies.get("taubman-"+ this.property.id +"-email")) {
                this.$store.state.email = this.$cookies.get("taubman-"+ this.property.id +"-email");
                this.$router.push('/badges');
              } else {
                this.$router.push('/');
              }
          }, (error) => { 
            console.log("Error: " + error);
              //this.handleError(error,{type:'API',request:'getRequest',path:path});
          });
    }
    
    
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
    getCharacters: function () {
      let path = "/get_characters";
      let data = {}
      this.postMethod(path, data).then(response => {
        this.$store.state.characters = response.data.data.characters;
      }, error => {
        console.log("Error: " + error);
      })
    }
  }
}
</script>