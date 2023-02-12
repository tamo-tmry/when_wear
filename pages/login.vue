<template>
    <div class="inner">
        <VBtn color="primary" @click="login">ログイン</VBtn>
    </div>
</template>

<script setup lang="ts">
const { signIn } = useAuth()

const login = async () => {
    await signIn()
    const to = useRoute().redirectedFrom?.fullPath || '/'
    navigateTo(to, { redirectCode: 302 })
}
</script>

<style scoped lang="scss">
.inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
