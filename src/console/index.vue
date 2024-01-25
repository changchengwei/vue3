<template>
    <div class="home">
        <div class="nav-menus">
            <div class="nav">
                <div class="nav-icon nav-conent">
                    <img src="@/assets/image/google.png" style="width:33px;height:33px">
                </div>
                <div :class="[isActive == item.menu_name ? 'active' : '', 'nav-conent']"
                    v-for="item in routerList" :key="item"
                    @click="onNav(item)"
                >
                    <el-icon :size="15">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <div>{{item.menu_name}}</div>
                </div>
            </div>
            <menus :data='menusData' :code='isCode'></menus>
        </div>
        <div class="main">
            <main-content></main-content>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, watch} from "vue"
import mainContent from './main-content.vue'
import menus from "./menus.vue"
import { useRouter } from "vue-router"
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

watch(() => router.currentRoute.value.matched, (newValue) => {
    // 做下判断 防止频繁触发
    if(newValue[0].name !== isActive.value){
        onNav(router.currentRoute.value.matched[0], false)
    }
});
let routerList = ref([])
onMounted(() => {
    routerList = store.state.menu.length !== 0 ? JSON.parse(store.state.menu) : JSON.parse(sessionStorage.getItem('menu'))
    // 默认导航选项
    onNav(router.currentRoute.value.matched[0], false)
})

/*
    点击导航栏 
    用code变量来区分是点击导航 还是通过监听路由触发的事件
    1、code为true 是用户点击 --> 则默认选中第一个菜单
    2、code为false 是监听路由变化 --> 则选中要跳转到的页面菜单
*/
const menusData = ref([])
const isCode = ref()
const isActive = ref('')
const onNav = (item, code = true) => {
    isActive.value = item.menu_name || item.name
    menusData.value = []
    isCode.value = code
    routerList.forEach(d => {
        if(d.menu_name == (item.menu_name || item.name) && d.children){
            d.children.forEach(n => {
                menusData.value.push(
                    {
                        order:n.order,
                        icon:n.icon,
                        menu_name: n.menu_name,
                        router_name: `/${d.router_name}/${n.router_name}`
                    }
                )
            })
        }
    })
    menusData.value.sort(up)
}
const up = (x,y) => {
    return x.order - y.order
}
</script>
<style lang='scss'>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    .nav-menus{
        height: 100%;
        flex-shrink: 0;
        display: flex;
        .nav{
            width: 70px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #282c34;
            border-right: 1px solid;
            @include border_color();
            .nav-conent{
                width: 52px;
                height: 54px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 5px;
                border-radius: 5px;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }
            .active{
                background-color: #4e88f3;
            }

        }
    }
    .main{
        flex-grow: 1;
        min-width: calc(100% - 270px);
    }
}
</style>