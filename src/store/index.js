import { createStore } from 'vuex'

const store = createStore({
    state: {
        user_name:'',
        user_id:'',
        xtoken:'',
        menu:[],
        asyncRoutestMark:false,
    },
    // 这里是set方法
    mutations: {
        setUser(state, obj) {
            state.user_name = obj.user_name,
            state.user_id = obj.user_id,
            sessionStorage.setItem('user_name', obj.user_name)
            sessionStorage.setItem('user_id', obj.user_id)
        },
        setXtoken(state, xtoken){
            state.xtoken = xtoken,
            sessionStorage.setItem('xtoken', xtoken)
        },
        setMenu(state, menu){
            state.menu = menu,
            sessionStorage.setItem('menu', menu)
        },
        setAsyncRoutestMark(state, asyncRoutestMark){
            state.asyncRoutestMark = asyncRoutestMark
        }
    },
    // 这里是get方法,并且每次打开浏览器优先执行该方法，获取所有的状态
    getters: {

    },

})


export default store