<template>
  <div v-if="badge">
    <div class="id-badge-container">
      <div class="id-badge-img">
        <div class="id-badge-img-container" v-if="badge.imageURL" :style="`background-image: url({{ badge.imageURL}});`"></div>
        <div v-else>
            <img class="id-badge-img-container" :src="imageData">
        </div>
      </div>
      <div class="id-badge-name">
        <span>{{badge.name}}</span>
      </div>
      <div class="id-badge-codename">
        <span>"{{badge.codename}}"</span>
      </div>
      <div class="id-badge-specialty">
        <span>{{JSON.parse(this.badge.character.job_title)[this.locale]}}</span>
      </div>
      <div class="id-badge-mall">
        <span>{{property.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  transition: "page",
  components: {},
  data: function() {
    return {
        badge: null,
        imageData: '',
        is_photo_available: false  
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["property", "timezone", "locale", "getTodayHours", "cadet", "is_new_profile"])
  },
  methods: {
      loadData: function () {
          if(this.$route.fullPath.indexOf("new_badge") >= 0){
              this.badge = this.cadet;
          } else {
              this.getBadge();
          }
          if(this.badge['file']) {
              this.loadImage();
          }
      },
      loadImage: function() {
        this.file = this.cadet.file;
        var reader = new FileReader();
        reader.onload = (e) => {
            this.imageData = e.target.result;
            this.is_photo_available = true;
        }
      reader.readAsDataURL(this.file);
      },
      getBadge: function() {
        let path = "/get_badge";
        let data = {
            "badge_id": this.$route.params.slug
        }
        this.postMethod(path, data).then(
            response => {
              let badgeData = response.data.data;
              badgeData['name'] = badgeData.short_name;
              badgeData['character'] = this.getCharacterFromName(badgeData.character);
              this.badge = badgeData;
            },
            error => {
              console.log("Error: " + error);
            }
          );
      }
  },
  created() {
      this.loadData();
  },
  beforeDestroy() {}
};
</script>
<style>
</style>