<template>
    <h1>login page</h1>
    <p @click="login">login</p>
</template>

<script setup>
const { signIn } = useAuth()

const login = async () => {
    await signIn()
    const to = useRoute().redirectedFrom?.fullPath || '/'
    navigateTo(to, { redirectCode: 302 })
}
</script>
