import {
    getAuth,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
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

    async function signIn(email: string, password: string) {
        const auth = getAuth()
        const { user } = await signInWithEmailAndPassword(auth, email, password)
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
