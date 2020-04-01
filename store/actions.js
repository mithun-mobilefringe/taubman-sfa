import types from './mutation_types'
import Cookies from 'js-cookie'
import axios from './axios'

const actions = {
    initializeApi: function({
        commit
    }, api) {
        commit(types.SET_API_DETAILS, {
            api: api
        });
    },
    getData: function({
        state,
        commit
    }, {
        resource,
        queryParams = null
    }) {
        // if (!state.api.version || !state.api.site){
        //   console.error("api version and api site must be set!");
        //   return;
        // }
        return new Promise((resolve, reject) => {
            if (resource !== "subcategories") {
                axios.get(resource + ".json", {
                    params: queryParams
                }).then(response => {
                    switch (resource) {
                        case "banners":
                            commit(types.SET_BANNERS, {
                                banners: response.data.banners
                            });
                            break;
                        case "blogs":
                            commit(types.SET_BLOGS, {
                                blogs: response.data.blogs
                            });
                            break;
                    }
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            } else {
                axios.get(resource + ".json?bust=true").then(response => {
                    commit(types.SET_SUBCATEGORIES, {
                        subcategories: response.data.subcategories
                    });
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            }
        })
    },
    LOAD_SEO: function({
        state,
        commit
    }, list) {
        return new Promise((resolve, reject) => {
            axios.get(process.env.API_URL + "/seo.json?path=" + list.url).then(response => {
                resolve(response);
            }).catch(error => {
                console.log("Data load error: " + error.message);
                reject(error);
            });
        })
    },
    LOAD_MALL_DATA: function({
        commit
    }, list) {
        console.warn("Load Mall Data has been deprecated.")
        return new Promise((resolve, reject) => {
            axios.get(list.url).then(response => {
                commit(types.SET_MALL_DATA, {
                    list: response.data
                })
                resolve(response);
            }).catch(error => {
                console.log("Data load error: " + error.message);
                reject(error);
            });
        })
    },
    LOAD_META_DATA: function({
        commit
    }) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/v1/get_meta_data").then(response => {
                commit(types.SET_META_DATA, {
                    list: response.data
                })
                resolve(response);
            }).catch(error => {
                console.log("Meta Data load error: " + error.message);
                reject(error);
            });
        })
    },
    INITIALIZE_LOCALE: function({
        commit
    }) {
        return new Promise((resolve, reject) => {
            let _locale = Cookies.get('locale');
            if (!_locale) {
                _locale = 'en-ca';
            }
            commit(types.SET_LOCALE, {
                lang: _locale
            })
            resolve(_locale);
        })
    },
    LOAD_PAGE_DATA: function({
        commit
    }, list) {
        return new Promise((resolve, reject) => {
            axios.get(list.url).then(response => {
                // commit('SET_MALL_DATA', { list: response.data })
                resolve(response);
            }).catch(error => {
                console.log("Data load error: " + error.message);
                reject(error);
            });
        })
    },
    CONTACT_US: function({
        commit
    }, send_data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/contact_us', {
                form_data: send_data.form_data
            }).then(response => {
                resolve(response);
            }).catch(error => {
                console.log("Data load error: " + error.message);
                reject(error);
            });
        })
    },
    POST_TO_MM: function({
        commit
    }, send_data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(send_data.url, send_data.form_data).then(response => {
                resolve(response);
            }).catch(error => {
                console.log("Data load error: " + error.message);
                reject(error);
            });
        })
    },
}

export default actions