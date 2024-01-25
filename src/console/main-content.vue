<template>
    <div class="main-content-title">
        <div class="title-left flex_0_0">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                    :to="{ path: '/' }"
                    v-for="item in breadcrumbList" :key="item"
                >
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class="breadcrumb" v-for="item in breadcrumbList" :key="item">
                <span>{{item.name}}</span>
                <span>{{"/"}}</span>
            </div>
        </div> 
        <div class="title-right">
           <el-switch
                v-model="theme"
                active-action-icon="View"
                inactive-action-icon="Hide"
                @change="switchChange"
            />
            <el-icon @click="lockup"><Lock /></el-icon>
            <el-icon @click="fullScreen"><FullScreen /></el-icon>
            <el-icon><ChatSquare /></el-icon>
            <el-icon><Refresh /></el-icon>
            <div class="title-right-user">
                <el-avatar> user </el-avatar>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{user}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="outUser">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <div class="main-content">
        <div class="content-tag">
            <el-tag
                v-for="item in tagList"
                :key="item"
                @close="tagClose(item)"
                @click="onTagClick(item)"
                closable
                size="large"
                type='info'
                :class="[item.name == radioTag?'radio-tag':'']"
            >
                {{ item.name }}
            </el-tag>
        </div>
        <div class="content-page">
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="content-footer">
                <span>{{"Copyright @ 2023 Vue Shop Vite | 黑ICP备2023014942号-1"}}</span>
            </div>
        </div>
    </div>
    <lockupPage v-show="lockupMsg" @openLock="lockup"></lockupPage>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import lockupPage from '../components/lockup-page.vue'
import { useRouter } from "vue-router"
import http from '../axios/http.js'

const router = useRouter()

// 监听路由变化 ==> 生成面包屑 ==> 生成tag数组 ==> 切换tag状态
watch(() => router.currentRoute.value, (newValue) => {
    getTagList() // 根据路由切换，生成tag数组（不可重复）
    breadcrumbList.value = newValue.matched // 获取面包屑数据
    radioTag.value = newValue.name // 根据路由切换 选中对应的tag
})
onMounted(() => {
    const newValue = router.currentRoute.value
    tagList.value = []
    getTagList() // 根据路由切换，生成tag数组（不可重复）
    breadcrumbList.value = newValue.matched // 获取面包屑数据
    radioTag.value = newValue.name // 根据路由切换 选中对应的tag
    user = sessionStorage.getItem('user_name')
})
let user = ref('')
const breadcrumbList = ref([])
const tagList = ref([])
// 获取tag数据
const getTagList = () => {
    const newValue = router.currentRoute.value
    tagList.value.push(
        {
            name:newValue.name, 
            routerName:newValue.path
        }
    )
    tagList.value = goRepetitionObjArr(tagList.value).value
}
// 对象数组去重
const goRepetitionObjArr = (arr) => {
    const m = new Map()
    const list = ref([])
    list.value = arr.filter((ele) => !m.has(ele.name) && m.set(ele.name, ""))
    return list
}

// 点击tag标签
const radioTag = ref('') // 选中的tag
const onTagClick = (item)=>{
    radioTag.value = item.name
    const routerName = item.routerName
    router.push(`${routerName}`)
}

// 清除tag标签
const tagClose = (item)=>{
    if(tagList.value.length !== 1){
        tagList.value = tagList.value.filter(t => {
            return t.name !== item.name
        })
        if(tagList.value.length > 0 && item.name == radioTag.value){
            onTagClick(tagList.value[0])
        }
    }
}

// 主题切换
const theme = ref(false)
const switchChange = () => {
    if(theme.value){
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.setAttribute('class', 'dark')
    }else{
        document.documentElement.setAttribute('data-theme', 'bright')
        document.documentElement.setAttribute('class', '')
    }
}

// 用户退出
const outUser = () =>{
    http.outUser()
    router.push('/')
}

// 页面锁定
let lockupMsg = ref(false)
const lockup = () => {
    lockupMsg.value = !lockupMsg.value
}

const fullScreen = () => {
    let full = document.fullscreenElement
    !full ? document.documentElement.requestFullscreen() : document.exitFullscreen()
}
</script>

<style lang='scss'>
.main-content-title{
    height: 60px;
    border-bottom: 1px solid ;
    border-left: 1px solid ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    @include border_color();
    @include bg_color();
    .title-left{
        font-size: 14px;
        .breadcrumb{
            
            span{
                margin-right: 8px;
            }
        }
        :last-child{
            :last-child{
                display: none;
            }
        }
    }
    .title-right{
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-right-user{
            display: flex;
            align-items: center;
            .el-avatar{
                margin-right: 3px;
            }
        }
        .el-dropdown-link {
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }
}
.main-content{
    height: calc(100% - 60px);
    border-left: 1px solid ;
    @include border_color();
    .content-tag{
        height: 50px;
        border-bottom: 1px solid ;
        padding: 0px 20px;
        display: flex;
        align-items: center;
        @include border_color();
        @include bg_color();
        .el-tag{
            padding: 0px 20px;
            margin-right: 8px;
            font-size: 14px;
            @include border_color();
            @include bg_color();
            @include font_color();
            cursor: pointer;
            &:hover{
                color: #4e88f3;
            }
        }
        .radio-tag{
            @include button_font_color();
            @include button_color();
        }
    }
    .content-page{
        height: calc(100% - 50px);
        overflow: auto;
        padding: 20px 20px;
        @include bg1_color();
    }
    .content{
        min-height: calc(100% - 70px);
        display: flex;
        flex-direction: column;
    }
    .content-footer{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ;
        border-radius: 5px;
        margin-top: 20px;
        @include border_color();
        @include bg_color();
    }
}
</style>