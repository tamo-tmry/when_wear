<template>
    <VAppBar>
        <VAppBarTitle>
            <NuxtLink to="/" class="title">When Wear</NuxtLink>
        </VAppBarTitle>
        <VSpacer />
        <VAppBarNavIcon v-if="isLogined" @click.stop="openNavigation" />
    </VAppBar>
    <VNavigationDrawer v-model="isOpenNavigation" location="bottom" temporary>
        <VList>
            <VListItem
                v-for="item in items"
                :key="item.title"
                :to="item.path"
                :prepend-icon="item.icon"
            >
                {{ item.title }}
            </VListItem>
            <VListItem prepend-icon="mdi-logout" @click="logout">
                ログアウト
            </VListItem>
        </VList>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
const { signOut, isAuthed } = useAuth()

const logout = async () => {
    await signOut()
    navigateTo('/login', { replace: true })
}

const isOpenNavigation = ref(false)

const isLogined = ref(isAuthed)

const openNavigation = () => (isOpenNavigation.value = true)

const items = [
    {
        title: '着用する',
        icon: 'mdi-hanger',
        path: '/'
    },
    {
        title: '着用リスト',
        icon: 'mdi-view-list',
        path: '/list'
    },
    {
        title: '画像追加',
        icon: 'mdi-file-image-plus',
        path: '/new'
    }
]
</script>

<style scoped lang="scss">
.title {
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
}
</style>
