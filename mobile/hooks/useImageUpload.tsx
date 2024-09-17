import Axios from 'axios'
import useURL from './useURL'
const useImageUpload = () => {
    const uploadImage = () => {
        const URL = useURL('upload')
        Axios.post("hh")
        console.log(URL)
    }

    return {
        uploadImage
    }

}

export default useImageUpload