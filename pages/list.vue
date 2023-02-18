<template>
    <Heading title="着用リスト" icon="mdi-view-list" />
    <VTable v-if="hasCombinations">
        <thead>
            <tr>
                <th
                    v-for="header in tableHeader"
                    :key="header.text"
                    :width="header.width"
                    class="text-left"
                >
                    {{ header.text }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="body in tableBody" :key="body.date">
                <td>{{ body.date }}</td>
                <td>
                    <VImg
                        v-for="image in body.images"
                        :key="image"
                        :src="image"
                    />
                </td>
            </tr>
        </tbody>
    </VTable>
    <div v-else>
        <p class="mb-4">着用リストが登録されていません</p>
        <VBtn to="/" color="secondary">着用する</VBtn>
    </div>
</template>

<script setup lang="ts">
const { userId } = useAuth()
const { getCombinations } = useDatabase()
const combinations = ref(await getCombinations(userId.value))

const hasCombinations = Boolean(combinations.value.length)

const tableHeader = [
    { text: '日付', width: '40%' },
    { text: '服', width: '60%' }
]

const tableBody = combinations.value.map((combination) => {
    return {
        date: combination.wearDate,
        images: combination.relations
    }
})

definePageMeta({
    middleware: ['auth']
})
</script>
