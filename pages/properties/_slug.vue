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
      let path = "/get_property/?property_id=" + this.property_id;
          this.$store.dispatch("getRequest", {
              path: path
          }).then(response => {
              this.property = response.data;
              this.$store.state.property = this.property;
              
              this.setCookies("taubman-property", this.property);
              this.getCharacters();
              this.$store.state.locale = this.$i18n.locale;
              let email = this.getCookies("taubman-"+ this.property.id +"-email");
              if(email) {
                this.$store.state.email = email;
                this.$router.push('/badges');
              } else {
                this.$router.push('/');
              }
          }, (error) => { 
            console.log("Error: " + error);
              //this.handleError(error,{type:'API',request:'getRequest',path:path});
          });
    
    
    
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