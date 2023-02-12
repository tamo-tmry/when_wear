<template>
    <VDialog :model-value="isOpenDialog" width="70%">
        <VCard>
            <VCardText>
                <p class="mb-2">この画像を登録しますか？</p>
                <VImg :src="fileUrl" />
            </VCardText>
            <VCardActions>
                <VBtn color="accent" class="mr-2" @click="closeDialog">
                    キャンセル
                </VBtn>
                <VBtn color="primary" @click="submit"> 決定 </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<script setup lang="ts">
const props = defineProps({
    isOpenDialog: {
        type: Boolean,
        default: false
    },
    file: {
        type: File,
        default: null
    }
})

const fileUrl = computed(() => {
    if (!props.file) return ''
    return URL.createObjectURL(props.file)
})

const revokeFileUrl = () => {
    URL.revokeObjectURL(fileUrl.value)
}

const emits = defineEmits(['closeDialog', 'submit'])

const submit = () => {
    revokeFileUrl()
    emits('submit')
}

const closeDialog = () => {
    revokeFileUrl()
    emits('closeDialog')
}
</script>
