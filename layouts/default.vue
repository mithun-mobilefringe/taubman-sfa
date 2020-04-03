<template>
  <div>
    <header-component></header-component>
    <nuxt />
    <footer-component/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      stickyMenu: false,
      windowWidth: 0,
    };
  },
  components: {
    headerComponent: () => import("~/components/headerComponent.vue"),
    footerComponent: () => import("~/components/footerComponent.vue")
  },
  beforeRouteEnter(to, from, next) {
    this.$store.state.property_id = this.$route.params.property_id;
    next();
  },
  created() {
    window.addEventListener("scroll", this.enableStickyNavbar);
    window.addEventListener("resize", this.getWindowWidth);
    this.loadData();
  },
  computed: {
    ...mapGetters(["property"])
  },
  methods: {
    loadData: function () {
      
    },
    enableStickyNavbar(e) {
      if (this.windowWidth > 468) {
        if (window.pageYOffset >= 50) {
          this.stickyMenu = true;
        } else {
          this.stickyMenu = false;
        }
      } else {
        if (window.pageYOffset >= 100) {
          this.stickyMenu = true;
        } else {
          this.stickyMenu = false;
        }
      }
    },
    getWindowWidth(e) {
      this.windowWidth = window.innerWidth;
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.enableStickyNavbar);
    window.removeEventListener("resize", this.getWindowWidth);
  }
};
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
