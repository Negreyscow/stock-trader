import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cloud.iexapis.com/beta/stock/'
})

export default instance;