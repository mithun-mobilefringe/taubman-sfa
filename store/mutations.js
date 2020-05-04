import types from './mutation_types'
import Cookies from 'js-cookie'

const mutations = {

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