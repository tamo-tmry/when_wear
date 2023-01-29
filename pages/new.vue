<template>
    <TheHeader />
    <input type="file" @change="uploadFile" />
    <ul>
        <li v-for="(image, index) in images" :key="index">
            <img :src="image" alt="" />
        </li>
    </ul>
</template>

<script setup lang="ts">
const { uploadImage, fetchImages } = useStorage()
const { userName } = useAuth()

const images = await fetchImages(userName.value)

const uploadFile = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    const file = files![0]
    const url = URL.createObjectURL(file)
    const blob = await fetch(url).then((r) => r.blob())
    URL.revokeObjectURL(url)
    uploadImage(blob, file.name, userName.value)
}

definePageMeta({
    middleware: ['auth']
})
</script>
