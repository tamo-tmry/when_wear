export default defineNuxtRouteMiddleware(async () => {
    // SSRの場合は必要
    // if (process.server) return

    const { checkAuthState, isAuthed } = useAuth()
    await checkAuthState()

    if (!isAuthed.value) {
        return await navigateTo('/login', { replace: true })
    }
})
