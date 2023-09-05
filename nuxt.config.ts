// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    build: {
        transpile: [
            "vee-validate/dist/rules"
        ],
    },
    // postcss: {
    //     plugins: {
    //         tailwindcss: {},
    //         autoprefixer: {},
    //     },
    // },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_URL
        }
    },
    components: [
        '~/components',
        { path: '~/components/layouts' },
        { path: '~/components/domains' },
        { path: '~/components/ui' },
    ],
})