import axios from 'axios'

const api = axios.create({
    baseURL: process.env.url,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api