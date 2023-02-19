<template>
    <CommonHeading title="着用する" icon="mdi-hanger" />
    <div class="mb-8">
        <VCheckbox
            v-model="isSelectedPastDate"
            label="過去の日付を選択する"
            :hide-details="true"
        />
        <Datepicker
            v-show="isSelectedPastDate"
            v-model="selectedDate"
            placeholder="日付を選択"
            :enable-time-picker="false"
            :format="dateFormat"
            locale="ja"
            dark
            auto-apply
        />
    </div>
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

const isSelectedPastDate = ref(false)
const selectedDate = ref()

const dateFormat = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${year}年${month}月${day}日`
}

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
    await registerCombination(
        userId.value,
        selectedClothesImageUrls.value,
        selectedDate.value
    )
    return navigateTo({ path: '/list' })
}

definePageMeta({
    middleware: ['auth']
})
</script>
