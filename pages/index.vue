<template>
    <Heading title="着用する" icon="mdi-hanger" />
    <VRow v-if="hasClothes">
        <VCol
            v-for="item in clothes"
            :key="item.name"
            cols="6"
            sm="4"
            md="4"
            lg="4"
            xl="4"
        >
            <ClothesCard
                :clothes-image-url="item.url"
                :selected-clothes-image-urls="selectedClothesImageUrls"
                @select-clothes="selectClothes"
            />
        </VCol>
    </VRow>
    <div v-else>
        <p class="mb-4">画像が登録されていません</p>
        <VBtn to="/new" color="secondary">画像登録</VBtn>
    </div>
    <RegisterButton
        :is-selected-clothes-image-urls="isSelectedClothesImageUrls"
        @click="selectCombination"
    />
</template>

<script setup lang="ts">
const { userId } = useAuth()
const { getClothes, registerCombination } = useDatabase()

const clothes = ref(await getClothes(userId.value))

const hasClothes = Boolean(clothes.value.length)

const selectedClothesImageUrls = ref([] as string[])

const isSelectedClothesImageUrls = computed(() =>
    Boolean(selectedClothesImageUrls.value.length)
)

// 選択していない画像の場合は選択状態にし、選択中の場合は選択を解除する
const selectClothes = (clothesImageUrl: string) => {
    const matchedIndex = selectedClothesImageUrls.value.findIndex(
        (selectClothesImageUrl) => selectClothesImageUrl === clothesImageUrl
    )

    matchedIndex === -1
        ? selectedClothesImageUrls.value.push(clothesImageUrl)
        : selectedClothesImageUrls.value.splice(matchedIndex, 1)
}

const selectCombination = async () => {
    await registerCombination(userId.value, selectedClothesImageUrls.value)
    return navigateTo({ path: '/list' })
}

definePageMeta({
    middleware: ['auth']
})
</script>
