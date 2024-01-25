<template>
    <div class="userManagement flex_column flex_grow1 tergum">
        <div class="user-head flex_between_0 ">
            <div class="head-left flex_0_0">
                <el-button type="danger" icon="Delete">批量删除</el-button>
            </div>
            <div class="head-right">
                <el-input
                    v-model="inputUser"
                    placeholder="请输入用户名"
                />
                <el-button type="primary" icon="Search">搜索</el-button>
            </div>
        </div>
        <el-table class="user-table flex_grow1 flex_basis0"
            :data="tableData"
            border
            show-overflow-tooltip
        >
            <el-table-column type="selection" width="55" />

            <el-table-column 
                v-for="item in columnList" :key="item"
                :label="item.name" 
                :min-width="item.minWidth" 
                align='center' 
            >
                <template #default="scope">{{ scope.row[item.type] }}</template>
            </el-table-column>
            <el-table-column label="操作"  align='center' width="170" >
                <el-button type="primary" text @click="dialogVisible = true">{{'修 改'}}</el-button>
                <el-button type="danger" text>{{'删 除'}}</el-button>
            </el-table-column>
        </el-table>
        <div class="user-pagination flex_0_0 ">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="编辑" width="20%">
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:40px" >用户</div>
            <el-input disabled placeholder="Please input"/>
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:40px">邮箱</div>
            <el-input disabled placeholder="Please input" />
        </div>
        <div class="dialog_span flex_1_1">
            <div class="flex_shrink0" style="width:40px">角色</div>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="Option A" size="small" />
                <el-checkbox label="Option B" size="small" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import http from '@/axios/http.js'

onMounted(() => {
    getTableData()
})

const checkList = ref([])
const inputUser = ref('')
const dialogVisible = ref(false)
const columnList = ref([
    {name:'用户ID', type:'user_id', minWidth:'100'},
    {name:'用户名', type:'user_name', minWidth:''},
    {name:'邮箱', type:'user_email', minWidth:''},
    {name:'角色', type:'role', minWidth:''},
    {name:'修改时间', type:'alter_date', minWidth:''},
    {name:'操作人', type:'operator', minWidth:''},
])
const tableData = ref([])
const getTableData = () => {
    http.post('selectUser').then((res)=>{
        tableData.value = res.data
    })
}

</script>
<style lang='scss'>
.userManagement{
    .user-head{
        margin-bottom: 10px;
        .head-left{}
        .head-right{
            display: flex;
            .el-input{
                width: 200px;
                height: 32px;
                margin-right: 10px;
            }
        }
    }
    .user-table{}
    .user-pagination{
        padding-top: 10px;
    }
}
</style>