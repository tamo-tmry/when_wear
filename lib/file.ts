export const getBlob = async (file: File) => {
    const url = URL.createObjectURL(file)
    const blob = await fetch(url).then((response) => response.blob())
    URL.revokeObjectURL(url)
    return blob
}
