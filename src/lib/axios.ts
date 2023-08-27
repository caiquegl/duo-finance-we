import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.url}/api`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api