import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const baseURL = '/api'
// const baseURL = '/'
const service = axios.create({
	baseURL: baseURL,
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({
	baseURL: baseURL,
    withCredentials: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
      console.log(
        'fetch',
        error.config.url,
        error.config.params,
        'error. error:',
        error
      )
      return Promise.reject(error)
    }
)

const api = {
    get_area(data) {
		return service.post('/PageAreaController/getAreaList', {pid:53})
    },
    get_cate(data) {
		return service.post('/PageMaterialController/getMaterialsClass', {})
    },
    get_cate_data(data) {
		return service.post('/PageMaterialController/getMaterialsInfo',data)
    }
}

export default api