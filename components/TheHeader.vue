<template>
    <header>
        <p @click="logout">logout</p>
    </header>
</template>

<script setup>
const { signOut } = useAuth()

const logout = async () => {
    await signOut()
    navigateTo('/login', { replace: true })
}
</script>