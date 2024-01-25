import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store/index.js'

const consolePage = import.meta.glob('./console/*.vue')
const modules = import.meta.glob('./pages/*/*/*.vue')

const routes = [
    {
        name:'登录',
        path: '/',
        component:consolePage['./console/login.vue']
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
/**
 * 登录钩子函数
 * to 即将要进入的目标 路由对象
 * from 当前导航正要离开的路由
 * next 一定要调用该方法来 resolve 这个钩子
 * next() 进行管道中的下一个钩子 如果全部钩子执行完了，则状态就是 confirmed （确认的）
 */


router.beforeEach((to, from, next) => {
    let routerList = []
    let xtoken = ''
    routerList = store.state.menu.length !==0 ? JSON.parse(store.state.menu) : JSON.parse(sessionStorage.getItem('menu'))
    xtoken = store.state.xtoken ? store.state.xtoken : sessionStorage.getItem('xtoken')
    if(to.name === '登录'){
        next()
    }else{
        // 判断是否登录
        if(xtoken){
            // 判断是否添加了路由信息
            if(!store.state.asyncRoutestMark){
                addRouterList(routerList)
                store.commit('setAsyncRoutestMark', true) // 添加路由后更改标识为true
                next({ ...to, replace: true })
            }else{
                next()
            }
        }else{
            next({name:'登录'})
        }
    }
})

const addRouterList = (routerList) => {
    routerList.forEach(t => {
        router.addRoute(
            {
                path: `/${t.router_name}`,
                name: t.menu_name,
                component: consolePage[t.file_path]
            }
        )
        if(t.children) {
            t.children.forEach(d => {
                router.addRoute(`${t.menu_name}`,{
                    path: d.router_name,
                    name: d.menu_name,
                    component: modules[d.file_path]
                })
            })
        }
    })
}


export default router