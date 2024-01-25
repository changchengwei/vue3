<template>
    <div class="roleManagement flex_column flex_grow1 tergum">
        <div class="role-head flex_between_0">
            <div class="head-left flex_0_0">
                <el-button type="primary" icon="Plus" @click="showDialog('添加')">添加角色</el-button>
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
        <el-table class="role-table flex_grow1 flex_basis0"
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
            <el-table-column label="操作"  align='center' width="170">
                <template #default="scope">
                    <el-button type="primary" text @click="showDialog('修改',scope.row)">{{'修改'}}</el-button>
                    <el-popconfirm title="删除确认?" @confirm="delectRole(scope.row)">
                        <template #reference>
                            <el-button type="danger" text>{{'删除'}}</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="role-pagination flex_0_0">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
    <el-dialog v-model="dialog" :title="dialogText" width="25%">
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:60px" >角色码</div>
            <el-input v-model="obj.roleCode" placeholder="Please input"/>
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:60px" >角色名称</div>
            <el-input v-model="obj.roleName" placeholder="Please input"/>
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:60px" >备注</div>
            <el-input v-model="obj.remark" placeholder="Please input"/>
        </div>
        <div class="dialog_span flex_1_1">
            <div class="flex_shrink0" style="width:60px" >菜单</div>
            <div class="dialog-tree flex_grow1 tergum">
                <el-tree :data="treeData" :props="defaultProps" show-checkbox/>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="addRole()">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import http from '@/axios/http.js'
import { useStore } from 'vuex'

const store = useStore()
let treeData = reactive([])
onMounted(() => {
    treeData = store.state.menu.length !==0 ? JSON.parse(store.state.menu) : JSON.parse(sessionStorage.getItem('menu'))
    getTableData()
})

const inputUser = ref('')
const defaultProps = ref(
    {  
        children: 'children',
        label: 'menu_name'
    }
)
const dialog = ref(false)
const dialogText = ref('')

const delectRole = (data) => {
    let param = {
        roleId: data.role_id
    }
    http.post('deleteRole',param)
    getTableData()
}
const obj = reactive(
    {
        roleCode:'',
        roleName:'',
        remark:'',
        roleId:'', 
        alterDate:'2020-3-2',
        operator:localStorage.getItem('user_name')
    }
)
const objData = reactive({
    '添加':() =>{http.post('addRole',obj)},
    '修改':() =>{http.post('upRole',obj)},
})
const showDialog = (msg,data) => {
    dialog.value = !dialog.value
    dialogText.value = msg
    obj.roleCode = ''
    obj.roleName = ''
    obj.remark = ''
    obj.roleId = ''
    if(data){
        obj.roleCode = data.role_code
        obj.roleName = data.role_name
        obj.remark = data.remark
        obj.roleId = data.role_id
    }
}
const addRole = () => {
    objData[dialogText.value]()
    getTableData()
    dialog.value = !dialog.value
}

const columnList = ref([
    {name:'ID', type:'role_id', minWidth:'100'},
    {name:'角色码', type:'role_code', minWidth:''},
    {name:'角色名称', type:'role_name', minWidth:''},
    {name:'修改时间', type:'alter_date', minWidth:''},
    {name:'操作人', type:'operator', minWidth:''},
    {name:'备注', type:'remark', minWidth:''},
])
const tableData = ref([])
const getTableData = () => {
    http.post('selectRole').then((res)=>{
        tableData.value = res.data
    })
}
</script>
<style scoped lang='scss'>
.roleManagement{
    .role-head{
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
    .role-pagination{
        margin-top: 10px;
    }
}
.dialog-tree{
    border:1px solid ;
    @include border_color();
    height:200px;
    overflow: auto;
}
</style>