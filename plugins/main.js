// import helper from '~/assets/javascripts/helper'
import Vue from 'vue'
import moment from 'moment';
import tz from 'moment-timezone';
import velocity from 'velocity-animate'

Vue.mixin({
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  created() {
    window.addEventListener('resize', this.getWindowWidth);
  },
  computed: {
    default_logo_url() {
      return '/images/coquitlam_default_logo.png';
    },
    twitterUsername() {
      return 'CoquitlamCentre';
    }
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    checkImageURL(value) {
      if (_.includes(value.image_url, 'missing')) {
        if (value.store === null || value.store === undefined) {
          return null;
        } else if (
          value.store != null &&
          value.store != undefined &&
          _.includes(value.store.store_front_url_abs, 'missing')
        ) {
          return null;
        } else {
          return value.store.store_front_url_abs
        }
      } else {
        return value.promo_image_url_abs
      }
    },
    isMultiDay(item, timezone) {
      if (item.start_date && item.end_date) {
        var start_date = moment(item.start_date)
          .tz(timezone)
          .format('MM-DD-YYYY')
        var end_date = moment(item.end_date)
          .tz(timezone)
          .format('MM-DD-YYYY');
        if (start_date === end_date) {
          return false
        } else {
          return true
        }
      }
      return false
    },
    checkStoreImageURL(store) {
      if (store === null || store === undefined) {
        return this.default_logo_url;
      } else if (
        store != null &&
        store != undefined &&
        _.includes(store.store_front_url_abs, 'missing')
      ) {
        return this.default_logo_url;
      } else {
        return store.store_front_url_abs
      }
    },
    truncate(val_body, length) {
      var truncate = _.truncate(val_body, {
        length: length,
        separator: " "
      });
      return truncate;
    },
    snakeCase(val) {
      return _.snakeCase(val);
    },
    isMissingImage(image_url) {
      return _.includes(image_url, 'missing');
    },
    serializeObject(obj) {
      var newObj = [];
      _.forEach(obj, function (value, key) {
        var tempVal = {};
        tempVal.name = key;
        tempVal.value = value;
        newObj.push(tempVal);
      });
      return newObj;
    },
    shareURL(slug, path) {
      var share_url = 'https://coquitlamcentre.com/' + path + '/' + slug
      return share_url
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      velocity(el, 'slideDown', {
        duration: 700
      })
    },
    leave: function (el, done) {
      velocity(el, 'slideUp', {
        duration: 700
      })
    },
    propertyAddress() {
      var address =
        this.property.name +
        '+' +
        this.property.address1 +
        '+' +
        this.property.city +
        '+' +
        this.property.province_state +
        '+' +
        this.property.country +
        this.property.postal_code
      var key = 'AIzaSyCukCjH3fsuDYBdI44hZKL43m60jEToJjY'
      var src =
        'https://www.google.com/maps/embed/v1/place?q=' +
        address +
        '&key=' +
        key
      return src
    },
    localeSEO(tempSEO, locale) {
      var seo = {
        title: null,
        meta: [{
            hid: "description",
            name: "description",
            content: null
          },
          {
            hid: "keywords",
            name: "keywords",
            content: null
          },
          {
            hid: "image",
            name: "image",
            content: null
          }
        ]
      };
      if (tempSEO) {
        if (locale == "fr") {
          if (tempSEO.meta_title2) {
            seo.title = tempSEO.meta_title2;
          }
          if (tempSEO.meta_description_2) {
            seo.meta[0].content = tempSEO.meta_description_2;
          }
          if (tempSEO.meta_keywords_2) {
            seo.meta[1].content = tempSEO.meta_keywords_2;
          }
          if (tempSEO.meta_image2) {
            seo.meta[2].content = tempSEO.meta_image2;
          }
        }

        //if french was empty or locale is english update seo
        if (!seo.title) {
          seo.title = tempSEO.meta_title;
        }
        if (!seo.meta[0].content) {
          seo.meta[0].content = tempSEO.meta_description;
        }
        if (!seo.meta[1].content) {
          seo.meta[1].content = tempSEO.meta_keywords;
        }
        if (!seo.meta[2].content) {
          seo.meta[2].content = tempSEO.meta_imag;
        }
      }
      return seo;
    },
    sanitizaWebsiteLink(store_website) {
      if (store_website) {
        if (_.includes(store_website, "https")) {
          store_website = _.replace(
            store_website,
            "https://",
            ""
          );
        } else if (_.includes(store_website, "http")) {
          store_website = _.replace(
            store_website,
            "http://",
            ""
          );
        }
      }
      return store_website
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.getWindowWidth)
  }
})
