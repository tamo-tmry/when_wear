<template>
    <Teleport to="body">
        <VBtn
            class="register-button"
            :disabled="!isSelectedClothesImageUrls"
            color="primary"
            @click="click"
        >
            <VIcon icon="mdi-upload" />
        </VBtn>
    </Teleport>
</template>

<script setup lang="ts">
defineProps({
    isSelectedClothesImageUrls: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['click'])

const click = () => {
    emits('click')
}
</script>

<style scoped lang="scss">
.register-button {
    position: fixed;
    right: 15px;
    bottom: 15px;
    width: 50px;
    min-width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
    border-radius: 50%;
}
</style>
