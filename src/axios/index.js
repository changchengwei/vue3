import axios from 'axios'
import store from '../store/index.js'
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const env = import.meta.env
// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        let xtoken = store.state.xtoken || sessionStorage.getItem('xtoken')
        let userName =store.state.userName || sessionStorage.getItem('user_name')
        let userId = store.state.userId || sessionStorage.getItem('user_id')
        if (xtoken) {
            config.headers['xtoken'] = xtoken
            config.headers['userName'] = userName
            config.headers['userId'] = userId
        }
        config.url = env.VITE_APP_ROOT + config.url
        return config
    }, 
    (err) => {
        return err.data
    }
)


// 添加响应拦截器
axios.interceptors.response.use(
    (res) => {
        let xtoken = res.headers['xtoken']
        if(xtoken){
            store.commit('setXtoken', xtoken)
        }
        if(res.data.code == 1001 || res.data.code == 1002) errAlert(res.data).then(()=>{router.push('/')})
        if(res.data.code == 1003) messageAlert(res.data)
        return res.data
    },
    (err) => {
        errAlert(err)
        return err.data
    }
)

const errAlert = (data) => {
    return ElMessageBox.confirm(
        data.message,
        '提示',
        {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
}

const messageAlert = (data) => {
    return ElMessage({
        center: true,
        showClose: true,
        type: 'warning',
        message: data.message,
    })
}

