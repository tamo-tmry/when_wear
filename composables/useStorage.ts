import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";


export const useStorage = () => {
    const uploadImage = async (blob: Blob, fileName: string, userName: string) => { const storage = getStorage()
        const storageRef = ref(storage, `${userName}/${fileName}`)
        const uploadImage = await uploadBytes(storageRef, blob)
        console.log('DEBUG UPLOAD RESULT: ', uploadImage.metadata.name)
    }
    
    const fetchImages = async (userName: string) => {
         const storage = getStorage()
        const storageRef = ref(storage, userName) 
        const imageRefs = await listAll(storageRef)
        const images = await Promise.all(imageRefs.items.map(async (imageRef) => await getDownloadURL(imageRef)))
        return images
    }

    return {
        uploadImage,
        fetchImages
    }
}