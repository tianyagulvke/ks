import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 请求拦截器

axiosInstance.interceptors.request.use(
    config => {
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // } else {
        //     throw new Error('Token not found')
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

// 封装GET请求

const get = (url: string, params = {}, options = {}) => {
    return axiosInstance.get(url, {
        params,
        ...options
    })
}

// 封装post请求

const post = (url: string, data = {}, options = {}) => {
    return axiosInstance.post(url, data, options)
}

export {get, post, axiosInstance}