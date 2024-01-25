import { createApp } from 'vue'
import App from './App.vue'
import './axios/index.js'

import store from './store/index.js'

import router from './router.js'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 全局组件
import bugDetails from "./components/bug-details.vue"
import bugSlot from "./components/bug-slot.vue"
import cascaderItem from "./components/cascader-item.vue"
import card from "./components/card.vue"


const app = createApp(App)
// 自定义指令
app.directive('focus', (el, binding) => {
    let count = 0 //初始值
    let num = el.innerText //获取页面中的值
    let rate = 30 //定时器间隔时间
    let average = num / (binding.value / rate) //得到每次定时器跳动的值

    const timer = setInterval(() => {
        // 将我们得到的值设置给count
        count += average
        el.innerText = count.toFixed(0)

        if(count > num){
            //为了防止数字错误将初始的值给他
            count = num
            el.innerText = count
            //清除定时器
            clearInterval(timer)
        }
    }, rate)
})
// 全局注册el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('bugDetails', bugDetails)
app.component('bugSlot', bugSlot)
app.component('cascaderItem', cascaderItem)
app.component('card', card)


app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
