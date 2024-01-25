<template>
    <div class="menuManagement flex_grow1 flex_between_1">
        <div class="left flex_column tergum">
            <div class="left-nav">
                <el-button type="primary" icon="Plus" @click="showDialog('添加导航')">添加导航</el-button>
            </div>
            <el-table class="flex_grow1 flex_basis0"
                :data="tableDataNav"
                border
                show-overflow-tooltip
            >
                <el-table-column 
                    v-for="item in navColumnList" :key="item"
                    :label="item.name" 
                    :min-width="item.minWidth" 
                    align='center' 
                >

                    <template #default="scope">
                        <el-icon :size="15" v-if="item.type == 'icon'">
                            <component :is="scope.row[item.type] "></component>
                        </el-icon>
                        <span v-else>{{ scope.row[item.type] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align='center' width="170">
                    <template #default="scope">
                        <el-button type="primary" text @click="showDialog('修改导航',scope.row)">{{'修改'}}</el-button>
                        <el-popconfirm title="删除确认?" @confirm="delectData(scope.row)">
                            <template #reference>
                                <el-button type="danger" text>{{'删除'}}</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="right flex_column tergum">
            <div class="right-menus"> 
                <el-button type="primary" icon="Plus" @click="showDialog('添加菜单')">添加菜单</el-button>
            </div>
            <el-table class="flex_grow1 flex_basis0"
                :data="tableDataMenu"
                border
                show-overflow-tooltip
            >
                <el-table-column 
                    v-for="item in menusMolumnList" :key="item"
                    :label="item.name" 
                    :min-width="item.minWidth" 
                    align='center' 
                >
                    <template #default="scope">
                        <el-icon :size="15" v-if="item.type == 'icon'">
                            <component :is="scope.row[item.type] "></component>
                        </el-icon>
                        <span v-else>{{ scope.row[item.type] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align='center' width="170">
                    <template #default="scope">
                        <el-button type="primary" text @click="showDialog('修改菜单',scope.row)">{{'修改'}}</el-button>
                        <el-popconfirm title="删除确认?" @confirm="delectData(scope.row)">
                            <template #reference>
                                <el-button type="danger" text>{{'删除'}}</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="dialog" :title="textTag" width="25%">
        <div class="dialog_span flex_1_0" v-if="textTag !== '添加导航'&& textTag !== '修改导航'">
            <div class="flex_shrink0" style="width:70px">父级ID</div>
            <el-input  placeholder="Please input"  v-model="obj.pid"/>
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:70px" >标题名称</div>
            <el-input placeholder="Please input"  v-model="obj.menuName"/>
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:70px">路由地址</div>
            <el-input placeholder="Please input"  v-model="obj.routerName" />
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:70px">图标</div>
            <el-input placeholder="Please input"  v-model="obj.icon" />
        </div>
        <div class="dialog_span flex_1_0">
            <div class="flex_shrink0" style="width:70px">文件路径</div>
            <el-input placeholder="Please input"  v-model="obj.filePath"/>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="as()">
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

const dialog = ref(false)
const navColumnList = ref([
    {name:'标题ID', type:'menu_id', minWidth:''},
    {name:'标题名称', type:'menu_name', minWidth:''},
    {name:'图标', type:'icon', minWidth:''},
    {name:'路由名称', type:'router_name', minWidth:''},
    {name:'文件路径', type:'file_path', minWidth:''}
])
const menusMolumnList = ref([
    {name:'菜单ID', type:'menu_id', minWidth:''},
    {name:'父ID', type:'pid', minWidth:''},
    {name:'菜单名称', type:'menu_name', minWidth:''},
    {name:'图标', type:'icon', minWidth:''},
    {name:'路由名称', type:'router_name', minWidth:''},
    {name:'文件路径', type:'file_path', minWidth:''}
])

const obj = reactive({
    menuId:'',
    pid:'',
    icon:'',
    menuName:'',
    routerName:'',
    filePath:''
})

const textTag = ref('')
const showDialog = (msg,data) =>  {
    dialog.value = !dialog.value
    textTag.value = msg
    obj.menuId = ''
    obj.icon = ''
    obj.menuName = ''
    obj.routerName = ''
    obj.filePath = msg == '添加导航' ?'./console/index.vue':''
    obj.pid = msg == '添加导航' ||  msg == '修改导航'?0:''
    if(data){
        obj.menuId = data.menu_id
        obj.pid = data.pid
        obj.icon = data.icon
        obj.menuName = data.menu_name
        obj.routerName = data.router_name
        obj.filePath = data.file_path
    }
}
const objData = reactive({
    '添加导航':() =>{addData(obj)},
    '添加菜单':() =>{addData(obj)},
    '修改导航':() =>{upData(obj)},
    '修改菜单':() =>{upData(obj)},
})
const as = () =>  {
    objData[textTag.value]()
    getTableData()
    dialog.value = !dialog.value
}
const addData = (param) =>  {
    http.post('addMenu', param)
}
const upData = (param) =>  {
    http.post('upMenu', param)
}
const delectData = (data) =>  {
    let param = {
        menuId : data.menu_id
    }
    http.post('deleteMenu', param)
    getTableData()
}


const tableDataNav = ref([])
const tableDataMenu = ref([])

const getTableData = () => {
    tableDataNav.value = []
    tableDataMenu.value = []
    http.post('selectMenu').then((res)=>{
        res.data.forEach(item => {
            if(item.pid == 0){
                tableDataNav.value.push(item)
            }else{
                tableDataMenu.value.push(item)
            }
        })
    })
}
</script>
<style scoped lang='scss'>
.menuManagement{
    .left{
        width: 40%;
        margin-right: 20px;
        .left-nav{
            margin-bottom: 10px;
        }
    }
    .right{
        width: 58%;
        .right-menus{
            margin-bottom: 10px;
        }
    }
}
</style>