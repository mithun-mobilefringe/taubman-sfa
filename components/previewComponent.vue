<template>
  <div v-if="badge">
    <div class="id-badge-container">
      <div class="id-badge-img">
        <div
          class="id-badge-img-container"
          v-if="badge.imageURL"
          :style="`background-image: url({{ badge.imageURL}});`"
        ></div>
        <div v-else>
            <div v-if="is_new_badge">
          <img class="id-badge-img-container" :src="imageData" />
            </div>
            <div v-else>
                <img class="id-badge-img-container" :src="badge.picture_url" />
            </div>
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
      imageData: "",
      is_photo_available: false,
      is_new_badge: false
    };
  },
  watch: {},
  computed: {
    ...mapGetters([
      "property",
      "timezone",
      "locale",
      "getTodayHours",
      "cadet",
      "is_new_profile"
    ])
  },
  methods: {
    loadData: function() {
      if (this.$route.fullPath.indexOf("new_badge") >= 0) {
          this.is_new_badge = true;
        this.badge = this.cadet;
        if (this.badge && this.badge["file"]) {
          this.loadImage();
        }
      } else {
          this.is_new_badge = false;
        this.getBadge();
      }
    },
    loadImage: function() {
      this.file = this.cadet.file;
      var reader = new FileReader();
      reader.onload = e => {
        this.imageData = e.target.result;
        this.is_photo_available = true;
      };
      reader.readAsDataURL(this.file);
    },
    getBadge: function() {
      let path = "/get_badge";
      let data = {
        badge_id: this.$route.params.slug
      };
      this.postMethod(path, data).then(
        response => {
          let badgeData = response.data.data;
          badgeData["name"] = badgeData.short_name;
          badgeData["character"] = this.getCharacterFromName(
            badgeData.character
          );
            if(badgeData.picture_url == null) {
                badgeData['imageURL'] = require("~/assets/img/elfPhotoPlaceholder_160.png");
          }
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