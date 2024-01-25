import axios from 'axios'
import store from '../store/index'
import urlAll from './urlAll'

const outUser = () => {
    store.commit('setUser', '')
    store.commit('setXtoken', '')
    store.commit('setMenu', '')
    store.commit('setAsyncRoutestMark', '')
    sessionStorage.clear()
}

const post = (url, params = {}) => {
    return axios.post(urlAll[url],params)
}
const get = (url) => {
    return axios.post(urlAll[url])
}

export default {post, outUser, get}