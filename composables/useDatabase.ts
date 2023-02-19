import {
    getDatabase,
    set,
    ref,
    query,
    get,
    orderByKey
} from 'firebase/database'
import { formattedDate, getToday } from '~/lib/date'

export const useDatabase = () => {
    const db = getDatabase()

    const registerClothes = async (
        userId: string,
        imageUrl: string,
        imageName: string
    ) => {
        const path = encodeURI(`${userId}/images/${imageName}`)
        await set(ref(db, path), {
            url: imageUrl,
            name: imageName
        })
    }

    const registerCombination = async (
        userId: string,
        relations: string[],
        selectedDate: Date
    ) => {
        const date = selectedDate ? formattedDate(selectedDate) : getToday()
        await set(ref(db, `${userId}/combination/${date}`), {
            relations,
            wearDate: date
        })
    }

    const getClothes = async (userId: string) => {
        const imagesRef = ref(db, `${userId}/images`)
        const requestQuery = query(imagesRef)
        const response = await get(requestQuery)
        const clothes = response.val()
        return clothes
            ? Object.keys(clothes)
                  .map((key) => clothes[key])
                  .reverse() // 降順に対応するAPIが存在しないため
            : []
    }

    const getCombinations = async (userId: string) => {
        const combinationsRef = ref(db, `${userId}/combination`)
        const requestQuery = query(combinationsRef, orderByKey())
        const response = await get(requestQuery)
        const combinations = response.val()
        return combinations
            ? Object.keys(combinations)
                  .map((key) => combinations[key])
                  .reverse() // 降順に対応するAPIが存在しないため
            : []
    }

    return {
        registerClothes,
        registerCombination,
        getClothes,
        getCombinations
    }
}
