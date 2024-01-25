<template>
    <div class="banner flex_1_0 tergum">
        <div class="banner-left">
            <img src="@/assets/image/xrk.png" style="width:80px;height:80px">
        </div>
        <div class="banner-right">
            <div class="right-top">{{greetings}} {{user}}，愿您天黑有灯，下雨有伞。</div>
            <div  class="right-bottom">1月10日更新： 🎉 点我跳转至官方演示地址 累计完成4种布局，3种主题，无数种颜色搭配，覆盖绝大多数使用场景，大幅提升开发效率。 新年特惠，新老用户限时折扣： 购买即送全新数据大屏模板、 门户模板， 点我购买！</div>
        </div>
    </div>
    <pageView></pageView>
    <manage></manage>
    <statistics></statistics>
</template>

<script setup>
import pageView from './pageView.vue'
import manage from './manage.vue'
import statistics from './statistics.vue'

import {ref, reactive, onMounted, watch} from 'vue'
import { useRouter } from "vue-router"
import http from "@/axios/http.js"
import store from "@/store/index.js"
import { dayjs } from 'element-plus'
const router = useRouter()

onMounted(() => {
    user.value = store.state.user_name ? store.state.user_name : sessionStorage.getItem('user_name')
    greetings.value = getGreetings()
})
let user = ref('')
let greetings = ref('')
const getGreetings = () => {
    let hour = dayjs().hour()
    if(0<hour && hour<=6){
        return '早上好'
    }
    if(6<hour && hour<12){
        return '上午好'
    }
    if(hour == 12){
        return '中午好'
    }
    if(12<hour && hour<18){
        return '下午好'
    }
    if(18<=hour && hour<24){
        return '晚上好'
    }
}
</script>
<style scoped lang='scss'>
.banner{
    background-image: linear-gradient(to left, #fff, #c6e2ff);
    padding: 20px 20px;
    .banner-left{
        margin-right: 15px;
    }
    .banner-right{
        .right-top{
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .right-bottom{
            font-size: 14px;
        }
    }
}
</style>