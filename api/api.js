import axios ,{AxiosResponse} from 'axios'
import qs from 'qs'
const service=axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' }
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

const api={
    get_cate(data){
        return service.post('/PageMaterialController/findByTime',data)
    },
    get_calilaio(data){
        // if(data) {
        //     data = qs.stringify(data)
        // }
        return service.post('/PageMaterialController/getMaterialsClass',data)
    },
    test(data) {
        return service.post('/PageMaterialController/getMaterialsInfo',data)
    }

}

export default api