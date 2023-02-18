<template>
    <div class="inner">
        <div class="input mb-2">
            <VTextField v-model="email" label="email" type="text" />
        </div>
        <div class="input mb-8">
            <VTextField v-model="password" label="Password" type="password" />
        </div>
        <VBtn color="primary" @click="login">ログイン</VBtn>
    </div>
    <Teleport to="body">
        <VAlert
            class="alert"
            :class="{ show: isShowAlert }"
            text="ログインに失敗しました。"
            type="error"
        />
    </Teleport>
</template>

<script setup lang="ts">
const { signIn } = useAuth()

const isShowAlert = ref(false)

const email = ref()
const password = ref()

const login = async () => {
    await signIn(email.value, password.value).catch((_e) => {
        isShowAlert.value = true
        setTimeout(() => (isShowAlert.value = false), 3000)
    })
    const to = useRoute().redirectedFrom?.fullPath || '/'
    navigateTo(to, { redirectCode: 302 })
}
</script>

<style scoped lang="scss">
.inner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: 0 auto;
}
.input {
    width: 100%;
}

.alert {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1007; // vuetifyのヘッダーより手前に表示させるため

    &.show {
        transform: translateY(0);
    }
}
</style>
