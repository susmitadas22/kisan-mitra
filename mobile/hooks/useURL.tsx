const useURL = (slug: string) => {
    return `${process.env.EXPO_PUBLIC_BACKEND_URL}/${slug}`
}


export default useURL