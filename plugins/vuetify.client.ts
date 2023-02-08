import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
    const customTheme: ThemeDefinition = {
        dark: true,
        colors: {
            primary: '#3f51b5',
            secondary: '#009688',
            accent: '#ff5722',
            error: '#f44336',
            warning: '#ffc107',
            info: '#2196f3',
            success: '#673ab7'
        }
    }
    const vuetify = createVuetify({
        components,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            }
        },
        theme: {
            defaultTheme: 'customTheme',
            themes: {
                customTheme
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})
