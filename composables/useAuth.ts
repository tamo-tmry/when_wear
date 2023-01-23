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

    async function saveUser(user: User | null) {
      token.value = user ? await user.getIdToken() : ''
      userName.value = user?.displayName || ''
    }

    async function signIn() {
      const auth = getAuth()

      // Sign in using a redirect.
      const provider = new GoogleAuthProvider();

      // Start a sign in process for an unauthenticated user.
      provider.addScope('profile');
      provider.addScope('email');
      const { user } = await signInWithPopup(auth, provider);
      saveUser(user)
    }

    async function clearUser() {
      token.value = ''
      userName.value = ''
    }
  
    async function signOut() {
      const auth = getAuth()
      await firebaseSignOut(auth)
      clearUser()
    }

    async function checkAuthState() {
      return new Promise<void | User | null>((resolve, reject) => {
        // SSRの場合は必要
        // if (process.server) return

        const auth = getAuth()
        onAuthStateChanged(
          auth,
          async (user) => {
            saveUser(user)
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
      userName
    }
  }