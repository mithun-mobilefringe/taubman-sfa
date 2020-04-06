<template>
  <div>
    <div class="main"></div>
    <div class="header-container col-12">
      <div class="col-md-3 md-logo display-mobile"></div>
      <div class="ribbon col-12 col-md-6">
        <div class="logo"></div>
        <div class="app-title">
          <img alt class="header-label" :src="headerfile"/>
        </div>
      </div>
      <div class="header-santa col-md-3 display-mobile"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  transition: "page",
  components: {},
  props: ['headerfile'],
  data: function() {
    return {
    };
  },
  watch: {},
  computed: {
    /* ...mapGetters(['property', 'timezone', 'getTodayHours']) */
  },
  methods: {
    loadData: async function(id) {
      try {
      } catch (e) {
        console.log("Error loading data: " + e.message);
      }
    },
    headerUpdate: function(fileName) {
      this.headerfile = fileName;
    },
    close(e) {}
  },
  created() {
    
  },
  beforeDestroy() {}
};
</script>
<style>
@media (max-width: 768px) {
  .mobile-heading {
    display: flex;
    justify-content: center;
  }
  .ribbon {
    top: -60px !important;
  }
  
}
@media (max-width: 1024px) {
  .logo {
    background: url("../assets/img/mobile-logo.png") no-repeat;
    width: 100%;
    min-height: 100px;
    background-position: center;
  }
  .app-title {
    height: 80px;
    background-size: 100% 82px;
  }
  .display-mobile {
    display: none;
  }
  .header-label {
  width: 180px !important;
}
}
@media (min-width: 1024px) {
  .ribbon-label {
    position: absolute;
    z-index: 21;
    width: 40%;
  }
}
.header-container {
  display: flex;
  justify-content: center;
  position: absolute;
}
.ribbon {
  display: flex;
  align-items: center;
  flex-direction: column;
  top: -25px;
  z-index: 20;
}
.header-green-ribbon {
  width: 65%;
  background: url("../assets/img/green-ribbon.png") no-repeat;
  min-height: 80px;
}
.header-label {
  width: 270px;
}
.md-logo {
  background: url("../assets/img/md-logo.png") no-repeat;
  width: 100%;
  min-height: 320px;
  z-index: 20;
}
.header-santa {
  background: url("../assets/img/decor1.png") no-repeat;
  width: 100%;
  min-height: 350px;
  top: -65px;
  z-index: 20;
}
</style>