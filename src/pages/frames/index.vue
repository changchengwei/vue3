<template>
    <div class="head">
    </div>
    <div class="main">
        <div class="menus">
            <menus></menus>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
    
    <!-- <div class="">

    </div> -->
</template>

<script setup>
import menus from './menus/index.vue'
</script>
<style scoped lang='less'>
.head{
    width: 100%;
    height: 60px;
    background-color: #545c64;
}
.main{
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    .menus{
        width: 220px;
        height: 100%;
    }
    .content{
        width: calc(100% - 220px);
        height:100%;
        padding: 10px 20px;
    }
}   

</style>