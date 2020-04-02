const pkg = require('./package')

const webpack = require('webpack')
const axios = require('axios')
const API_URL = "https://mallmaverick.com/api/v4/taubman/holiday"
const MM_HOST = "https://halifaxcentre.mallmaverick.com"
export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        htmlAttrs: {
            lang: 'en-US',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    server: {
        port: 8000, // default: 3000
    },
    /* Set your environment variables here */
    env: {
        API_URL: "http://localhost:3000/taubman/holiday",
        MM_HOST: MM_HOST
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        '~/assets/stylesheets/main.scss',
        '~/node_modules/vue2-animate/dist/vue2-animate.min.css',
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/es6-shim.js',
        //'~/plugins/init-data.js',
        '~/plugins/vue-moment.js',
        '~/plugins/vue-lazyload.js',
        {
            src: '~/plugins/vue-masonry',
            ssr: false
        },
        '~/plugins/vue-paginate.js',
        '~/plugins/vee-validate.js',
        //'~/plugins/main.js',
        '~/plugins/vue-smooth-scroll.js'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [,
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt',
        'nuxt-vuex-router-sync',
        '@nuxtjs/font-awesome', ['nuxt-i18n', {
            locales: [{
                    code: 'en',
                    iso: 'en-CA',
                    name: 'English',
                    file: 'en.js'
                },
                {
                    code: 'fr',
                    iso: 'fr-CA',
                    name: 'Français',
                    file: 'fr.js'
                }
            ],
            defaultLocale: 'en',
            lazy: true,
            langDir: 'locales/',
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: 'i18n_redirected'
            },
            vueI18n: {
                fallbackLocale: 'en',
            },
            parsePages: false
        }],
        '@nuxtjs/google-analytics',
        '@nuxtjs/sitemap'
    ],
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [],
    /* Build configuration */
    build: {
        /* You can extend webpack config here */
        extend(config, ctx) {

        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'lodash'
                    // ...etc.
            })
        ]
    }
}