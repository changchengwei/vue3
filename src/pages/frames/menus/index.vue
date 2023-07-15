<template>
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
                <template #title>
                    <span>菜单一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">菜单 1 - 1</el-menu-item>
                    <el-menu-item index="1-2">菜单 1 - 2</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="4" @click="openMenu">
                <span>菜单二</span>
            </el-menu-item>
        </el-menu>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
    function openMenu(){
        console.log('21221')
        router.push('/test')
    }

</script>
<style lang='less'>
.el-menu{
    height: 100%;
}
</style>