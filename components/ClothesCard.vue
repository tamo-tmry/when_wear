<template>
    <VCard :class="{ selected: isSelected }" @click="selectClothes">
        <VImg :src="clothesImageUrl" alt="" />
    </VCard>
</template>

<script setup lang="ts">
const props = defineProps({
    clothesImageUrl: {
        type: String,
        required: true
    },
    selectedClothesImageUrls: {
        type: Array,
        required: true
    }
})

const emits = defineEmits(['selectClothes'])

const selectClothes = () => {
    emits('selectClothes', props.clothesImageUrl)
}

const isSelected = computed(() => {
    const matchedClothes = props.selectedClothesImageUrls.find(
        (selectedClothesImageUrl) => {
            return selectedClothesImageUrl === props.clothesImageUrl
        }
    )
    return Boolean(matchedClothes)
})
</script>

<style scoped lang="scss">
.v-card {
    transition: opacity 0.4s ease-in-out;

    &:not(.selected) {
        opacity: 0.3;
    }
}
</style>
