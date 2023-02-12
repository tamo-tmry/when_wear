import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: config.FIREBASE_AUTH_DOMAIN,
        projectId: config.FIREBASE_PROJECT_ID,
        storageBucket: config.FIREBASE_STORAGEBUCKET,
        messagingSenderId: config.MESSAGING_SENDER_ID,
        appId: config.APP_ID
    }
    initializeApp(firebaseConfig)
})
