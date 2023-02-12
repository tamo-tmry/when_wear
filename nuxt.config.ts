// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
            FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET || '',
            MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID || '',
            APP_ID: process.env.APP_ID || ''
        }
    },
    css: ['vuetify/lib/styles/main.sass', '@/assets/style/global.scss'],
    build: {
        transpile: ['vuetify']
    },
    app: {
        head: {
            meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
        }
    }
})
