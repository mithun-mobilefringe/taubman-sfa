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
    }
}

export default mutations