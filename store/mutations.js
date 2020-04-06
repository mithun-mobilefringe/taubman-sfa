import types from './mutation_types'
import Cookies from 'js-cookie'

const mutations = {
    [types.SET_API_DETAILS](state, {
        api
    }) {
        state.api = api;
    },
    [types.SET_BANNERS](state, {
        banners
    }) {
        state.banners = banners;
    },
    [types.SET_BLOGS](state, {
        blogs
    }) {
        state.blogs = blogs;
    },
    [types.SET_LOCALE](state, {
        lang
    }) {
        state.locale = lang
        Cookies.set('locale', lang);
    },
    [types.SET_HEADERFILE](state, {
        headerfile
    }) {
        state.headerfile = headerfile
    }
}

export default mutations