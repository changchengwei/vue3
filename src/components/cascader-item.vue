<template>
    <div class="cascader-item">
        <el-checkbox-group
            v-model="checkList[item.id]" 
            v-for="item in idList" :key="item"
            @change="checkboxChange"
            >
            <el-checkbox-button v-for="city in dataObj[item.id]" :key="city" :label="city">{{
                city.value
            }}</el-checkbox-button> 
        </el-checkbox-group>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted} from "vue";

const emit = defineEmits(['checkChange'])

const props = defineProps({
    keyIdList: Array,
    cascaderList: Array,
})

let data = props.cascaderList;
let idList = props.keyIdList;

// 选中的数据
const checkList = reactive({
    lv0:[],
    lv1:[],
    lv2:[],
})
// 保存选中数据值
const checkListItem = reactive({
    lv0:[],
    lv1:[],
    lv2:[],
})
var datas = {
  "广东省": {
    "珠海市": ["香洲区", "斗门区"],
    "广州": ["番禺", "黄埔"]
  },
  "仙侠世界": {
    "玄幻大陆": ["无敌区", "无人区"],
    "科技大陆": ["天才区", "学士区"]
  }
};
function as () {
    for (let key in checkList) {
        checkListItem[key] = [];
        checkList[key].forEach((item)=>{
            checkListItem[key].push(item.value);
        })
        checkListItem[key] =  [...new Set(checkListItem[key])];
    }
}
function ass () {
    // data
    // parentId
    for (let key in dataObj) {
        dataObj[key] = [];
        dataObj[key].forEach((item)=>{
            if(item.parentId == checkListItem[key]){
                dataObj[key].push(item)
            }
        })
    }
}

const checkboxChange = () => {
    as();

    console.log(checkListItem)
    // emit('checkChange',checkList)
}
const dataObj = reactive({
    lv0:[],
    lv1:[],
    lv2:[],
})
// 各个层级数据处理 
function dataObjProcessing () {
    data.forEach((item) => {
        if(item.lv0 == ""){
            dataObj.lv0.push({...item,le:0})
        }
        if(item.lv0 !== "" && item.lv1 == ""){
            dataObj.lv1.push({...item,le:1})
        }
        if(item.lv0 !== "" && item.lv1 !== ""){
            dataObj.lv2.push({...item,le:2})
        }
    }); 
}
dataObjProcessing();

</script>
<style lang='scss'>
.cascader-item{
    .el-checkbox-group{
        margin-bottom: 8px;
    }
    .el-checkbox-button__inner{
        width: 160px;
    }
}
</style>