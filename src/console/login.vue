<template>
    <div class="login">
        <!-- <div class='login-title'>
            <span>{{'热心市民'}}</span>
        </div> -->
        <div class="login-main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="user">
                    <el-form :model="userForm">
                        <el-form-item>
                            <el-input v-model="userForm.user" placeholder="用户名/手机号" prefix-icon="User" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="userForm.password" placeholder="密码" show-password prefix-icon="Lock" />
                        </el-form-item>
                        <div class="clearfix">
                            <el-checkbox v-model="checked0" label="7天内自动登录" size="large" />
                            <span>找回密码</span>
                        </div>
                        <el-button type="primary" @click="onLogin">登录</el-button>
                        <el-checkbox v-model="checked1" label="我已阅读并同意《用户注册协议》,《隐私政策》" size="large" />
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <el-form :model="registerForm">
                        <el-form-item>
                            <el-input v-model="registerForm.name" placeholder="用户名/手机号" prefix-icon="User" />
                        </el-form-item>
                        <el-button type="primary" @click="onRegister">点击按钮进行验证</el-button>
                        <el-checkbox v-model="checked2" label="我已阅读并同意《用户注册协议》,《隐私政策》" size="large" />
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <div class="footer">
        <span>{{"黑ICP备2023014942号-1"}}</span>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import http from "@/axios/http.js"
import store from "@/store/index.js"

const router = useRouter();

const userForm = ref({
    user: '734592421',
    password: '1128'
})
const registerForm = ref({
    name: ''  
})
const checked0 = ref(false);
const checked1 = ref(false);
const checked2 = ref(false);

const activeName = ref("user");

const handleClick = () => {

}
const onLogin = () => {
    http.post('login', userForm.value)
    .then((res) => {
        if(res.data.length !== 0){
            store.commit('setUser', res.data[0])
            getXtoken()
        }
    })
}

const getXtoken = () => {
    let userName = store.state.userName ? store.state.userName : sessionStorage.getItem('user_name')
    let userId = store.state.userId ? store.state.userId : sessionStorage.getItem('user_id')
    http.post('getXtoken', {userId, userName})
    .then((res) => {
        if(res.data){
            store.commit('setXtoken', res.data)
            getMenu()
        }
    })
}

const getMenu = () => {
    http.post('selectMenu')
    .then((res) => {
        if(res.data){
            let list = toArrayTree(res.data)
            let data = JSON.stringify(list)
            store.commit('setMenu', data)
            router.push(`/primary/homePage`)
        }
    })
    
}

const toArrayTree = (arr,id=0) => {
    let list = []
    arr.forEach(item => {
        if(item.pid == id){
            list.push(item)
            let children = toArrayTree(arr, item.menu_id)
            if(children.length) {
                item["children"] = children; 
            }
        }
    })
    return list
}

const onRegister = () => {

}
</script>
<style lang='scss'>
.login{
    display: flex;
    justify-content: center;
    .login-main{
        width: 420px;
        padding: 12px 40px 6px;
        margin-top: 10%;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 3px 0 rgba(213, 213, 213, .7);
        .el-tabs__content{
            padding: 24px 0px;
        }
        .el-tabs__nav{
            width: 100%;
            height: 53px;
            display: flex;
            justify-content: center;
            .el-tabs__item{
                height: 100%;
                font-size: 16px;
                padding: 20px 24px;
                font-weight: 700;
            }
            #tab-register{
                margin-left: 48px;
            }
        }
        .el-input{
            height: 40px;
        }
        .el-button{
            width: 100%;
            height: 40px;
        }
        .clearfix{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: 14px;
            }
        }
    }
}
.footer{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>