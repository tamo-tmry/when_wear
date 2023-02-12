import {
    getAuth,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    User
} from 'firebase/auth'

export const useAuth = () => {
    const token = useState<string>('token', () => '')
    const userName = useState<string>('userName', () => '')
    const isAuthed = computed(() => Boolean(token.value))
    const userId = useState<string>('userId', () => '')

    async function saveUser(user: User | null) {
        token.value = user ? await user.getIdToken() : ''
        userName.value = user?.displayName || ''
        userId.value = user?.uid || ''
    }

    async function signIn() {
        const auth = getAuth()

        // Sign in using a redirect.
        const provider = new GoogleAuthProvider()

        // Start a sign in process for an unauthenticated user.
        provider.addScope('profile')
        provider.addScope('email')
        const { user } = await signInWithPopup(auth, provider)
        saveUser(user)
    }

    function clearUser() {
        token.value = ''
        userName.value = ''
        userId.value = ''
    }

    async function signOut() {
        const auth = getAuth()
        await firebaseSignOut(auth)
        clearUser()
    }

    function checkAuthState() {
        return new Promise<void | User | null>((resolve, reject) => {
            // SSRの場合は必要
            // if (process.server) return

            const auth = getAuth()
            onAuthStateChanged(
                auth,
                async (user) => {
                    await saveUser(user)
                    resolve()
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    return {
        signIn,
        signOut,
        isAuthed,
        checkAuthState,
        userName,
        userId
    }
}
