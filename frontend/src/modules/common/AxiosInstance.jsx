import axios from "axios"

const AxiosInstance = axios.create({
   baseURL: 'http://localhost:8002',
})

export default AxiosInstance