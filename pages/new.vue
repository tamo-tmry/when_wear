<template>
    <Heading title="画像追加" icon="mdi-file-image-plus" />
    <input type="file" @change="selectFile" />
    <Modal
        :is-open-dialog="isOpenDialog"
        :file="file"
        @close-dialog="closeDialog"
        @submit="upload"
    />
</template>

<script setup lang="ts">
import { getBlob } from '~/lib/file'
const { uploadFile } = useStorage()
const { userName, userId } = useAuth()
const { registerClothes } = useDatabase()

const isOpenDialog = ref(false)

const closeDialog = () => (isOpenDialog.value = false)

const file = ref()

const upload = async () => {
    const blob = await getBlob(file.value)
    const fileUrl = await uploadFile(blob, file.value.name, userName.value)
    const fileName = file.value.name.split('.')[0]
    await registerClothes(userId.value, fileUrl, fileName)
    return navigateTo({
        path: '/'
    })
}

const selectFile = (event: Event) => {
    const target = event.target as HTMLInputElement
    file.value = (target.files as FileList)[0]
    isOpenDialog.value = true
}

definePageMeta({
    middleware: ['auth']
})
</script>
