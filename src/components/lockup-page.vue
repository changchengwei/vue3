<template>
    <div class="lockupPage">
        <div class="main">
            <el-avatar
                :size="200"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <el-icon color="#fff" size="35"><Lock /></el-icon>
            <div class="text">屏幕已锁定</div>
            <div class="password">
                <el-input v-model="inputData" type="password" show-password/>
                <el-button type="primary" @click="open">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"

const emit = defineEmits(["openLock"])

const open = () => {
    emit("openLock");
};
const inputData = ref(132465789)
</script>
<style scoped lang='scss'>
.lockupPage {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: fixed;
    top: 0px;
    left: 0px;
    opacity: 0.7;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .main {
        width: 500px;
        padding: 20px 20px; 
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .el-avatar,.el-icon,.text,.paddword{
            margin-bottom: 20px;
            color: #fff;
        }
        .password {
            display: flex;
            justify-content: center;
        }
        .el-input {
            width: 260px;
        }
    }
}
</style>