import moment from 'moment'
import tz from 'moment-timezone'

const getters = {
    blogs: state => state.blogs,
    route: state => state.route,
    getLocale: state => {
        let locale = state.locale;
        return locale;
    },
    locale: state => state.locale,
    timezone: state => {
        let property = state.property;
        let timezone = (property !== null && property !== undefined) ? property.timezone_moment : null;
        return timezone;
    },
    property: state => state.property,
    repos: state => state.repos,
    locale: (state) => {
        moment.locale(state.i18n.locale);
        return state.i18n.locale;
    },
    profile: state => state.profile,
    badge: state => state.badge,
    email: state => state.profile,
    is_new_profile: state => state.is_new_profile,
    characters: state => state.characters
}

export default getters