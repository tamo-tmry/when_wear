import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

export const useStorage = () => {
    const storage = getStorage()

    const uploadFile = async (
        blob: Blob,
        fileName: string,
        userName: string
    ) => {
        const storageRef = ref(storage, `${userName}/${fileName}`)
        const { ref: uploadImageRef } = await uploadBytes(storageRef, blob)
        return await getDownloadURL(uploadImageRef)
    }

    return {
        uploadFile
    }
}
