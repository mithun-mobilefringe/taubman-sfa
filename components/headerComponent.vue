<template>
  <div>
    <div class="main"></div>
    <div class="header-container col-12">
      <div class="col-lg-4 display-mobile header-logo">
      <div class="md-logo">
        <img src="../assets/img/md-logo.png">
      </div>
      </div>
      <div class="ribbon col-12 col-lg-4">
        <div class="logo"></div>
        <div class="app-title">
          <img alt class="header-label" :src="headerfile"/>
        </div>
      </div>
      <div class="col-lg-4 display-mobile header-santa-logo">
      <div class="md-logo">
        <img src="../assets/img/decor1.png">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  transition: "page",
  components: {},
  //props: ['headerfile'],
  data: function() {
    return {
    };
  },
  watch: {},
  computed: {
    /* ...mapGetters(['property', 'timezone', 'getTodayHours']) */
    headerfile : function () {
      return this.$store.state.headerfile
    }
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
    display: none !important;
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
  padding: 0px;
}
.ribbon {
  height: 125px;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: -25px;
  z-index: 20;
  padding: 0px;
}
.header-green-ribbon {
  width: 65%;
  background: url("../assets/img/green-ribbon.png") no-repeat;
  min-height: 80px;
}
.header-label {
  width: 270px;
  margin-top: 5px;
}
.md-logo {
  z-index: 20;
}
.header-logo {
  display: flex;
  justify-content: flex-start;
  padding-left: 35px;
}
.header-santa-logo {
  top: -65px;
  padding-right: 35px;
  display: flex;
  justify-content: flex-end;
}
</style>