<template>
    <div class="menus" :class="{menusMove:!move}">
        <div class="menu-title">
            <div>{{'vue3 + vite'}}</div>
        </div>
        <el-menu
            :default-active='defaultMenus'
            text-color="#000"
        >
            <el-menu-item 
                :index="`${item.menu_name}`" 
                v-for="(item) in props.data" :key="item.menu_name" 
                @click="openMenu(item)">
                <el-icon :size="15">
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{item.menu_name}}</span>
            </el-menu-item>
        </el-menu>
        <div class="fold-expand" @click="showHiddenMenus">
            <el-icon :size="30" v-show="move"><Fold /></el-icon>
            <el-icon :size="30" v-show="!move"><Expand /></el-icon>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router"

const props = defineProps({
    data: Array,
    code: Boolean
})

const router = useRouter()
// 默认选中菜单
let defaultMenus = ref('')

watch(() => router.currentRoute.value, (newValue) => {
    defaultMenus.value = newValue.name
});
// 监听导航数据变化 显示默认菜单页面
watch(() => props.data, (newValue) => {
    if((newValue).length > 0){
        (newValue).forEach((item,i) => { 
            if(i == 0 && props.code){
                defaultMenus.value = item.menu_name
                openMenu(item)
            }else{
                defaultMenus.value = router.currentRoute.value.name
            }
        })
    }
})

// 点击菜单跳转路由
function openMenu(item) { 
    let routerName = item.router_name
    router.push(`${routerName}`)
}

// 菜单显示隐藏
let move = ref(true)
const showHiddenMenus = () => {
    move.value = !move.value
}

</script>
<style lang='scss'>
.menus{
    width: 200px;
    overflow: hidden;
    transition-property: all;
    transition-duration: 1000ms;
    position: relative;
    .menu-title{
        width: 200px;
        height: 60px;
        border-bottom: 1px solid ;
        display: flex;
        justify-content: center;
        align-items: center;
        @include border_color();
        @include bg_color();
    }
    .fold-expand{
        position: fixed;
        left: 20px;
        bottom: 10px;
        color: #4e88f3;
        cursor: pointer;
    }
    .el-menu {
        height: calc(100% - 60px);
        border: none;
        padding: 10px 10px;
        @include bg_color();
        .el-menu-item{
            border-radius: 5px;
            margin-bottom: 5px;
            @include font_color();
        }
        .el-menu-item:hover {
            @include button_color();
        }
        .is-active{
            @include button_font_color();
            @include button_color();
        }
    }
}
.menusMove{
    width: 0px;
}
</style>