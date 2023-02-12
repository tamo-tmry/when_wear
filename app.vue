<template>
    <VApp theme="customTheme">
        <TheHeader />
        <VMain>
            <div class="pa-4 inner">
                <NuxtPage />
            </div>
        </VMain>
    </VApp>
</template>

<style scoped lang="scss">
.inner {
    width: 100%;
    height: 100%;
}
</style>
