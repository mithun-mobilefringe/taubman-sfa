import types from './mutation_types'
import Cookies from 'js-cookie'
import axios from './axios'


function handleError(error) {
    console.log(error);
    if (error.response && error.response.status == 401) {

        logout(error);
    } else if (error.response && error.response.status == 403) {
        logout(error);
    } else if (error.response && error.response.status == 422) {
        //this is a validation error or unprocessable request.
    } else {
        alert(error);
    }
}

function logout(error) {
    //alert('logout!');
    if (error) {
        //alert("Access Denied")
        window.location = '/#/'
        console.log(error)
    }
}

function setAuthenticationHeaders(axios_param) {
    axios_param.defaults.headers.common['access-token'] = localStorage.getItem('access-token');
    axios_param.defaults.headers.common['client'] = localStorage.getItem('client');
    axios_param.defaults.headers.common['token-type'] = localStorage.getItem('token-type');
    axios_param.defaults.headers.common['uid'] = localStorage.getItem('uid');
    axios_param.defaults.headers.common['expiry'] = localStorage.getItem('expiry');
}

const actions = {
    initializeApi: function({
        commit
    }, api) {
        commit(types.SET_API_DETAILS, {
            api: api
        });
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
    //PUT = UPDATE
    PUT: function({ state, commit }, { path, resource, data, queryParams = {} }) {
        return new Promise((resolve, reject) => {
            setAuthenticationHeaders(axios);
            this.$axios.put(path, data).then(response => {
                console.log("calling PUT:", path);
                console.log("response data", response.data);
                processResourceFromResponse(resource, response, commit);
                resolve(response);
            }).catch(error => {
                handleError(error);
                reject(error);
            });
        })
    }, //POST = CREATE
    POST: function({ state, commit }, { path, resource, data, queryParams = {} }) {
        return new Promise((resolve, reject) => {
            setAuthenticationHeaders(axios);
            axios.post(path, data).then(response => {
                console.log("calling POST:", path);
                console.log("response data", response.data);
                processResourceFromResponse(resource, response, commit);
                resolve(response);
            }).catch(error => {
                handleError(error);
                reject(error);
            });
        })
    },
    UPLOAD: function({ state, commit }, { path, resource, data, queryParams = {} }) {
        return new Promise((resolve, reject) => {
            axios.post(path, data).then(response => {
                resolve(response);
            }).catch(error => {
                handleError(error);
                reject(error);
            });
        })
    },
    getRequest: function({ state, commit }, { path, resource, queryParams = {} }) {
        return new Promise((resolve, reject) => {
            setAuthenticationHeaders(axios);
            queryParams['include_if_missing_translations'] = true;
            queryParams['is_cms'] = true;
            console.log("=======")
            console.log(state.current_property)
            axios.get(path, { params: queryParams }).then(response => {
                //processResourceFromResponse(resource, response, commit);
                resolve(response);
            }).catch(error => {
                handleError(error);
                reject(error);
            });
        })
    },
    DELETE: function({ state, commit }, { path, resource, queryParams = {} }) {
        return new Promise((resolve, reject) => {
            setAuthenticationHeaders(axios);
            axios.delete(path).then(response => {
                console.log("calling DELETE:", path);
                console.log("response data", response.data);
                processResourceFromResponse(resource, response, commit);
                resolve(response);
            }).catch(error => {
                handleError(error);
                reject(error);
            });
        })
    },
}

export default actions