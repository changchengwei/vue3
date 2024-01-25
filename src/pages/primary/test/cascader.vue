<template>
    <bugSlot :msg="'B'">
        <template #bugShow>
            <cascaderItem :cascaderList="data" :keyIdList="idData"></cascaderItem>
        </template>
        <template #bugText>
            <bugDetails :data="textDataObj.echartsPromoteData"></bugDetails>
        </template>
    </bugSlot>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import textDataObj from "@/axios/data.js";


const idData = reactive([
    {id:"lv0"},
    {id:"lv1"},
    {id:"lv2"}
])

// 接口返回数据
const data = reactive([
    {lv:"",lv0:"",value:"辽宁"},
    {lv:"",lv0:"",value:"黑龙江"},

    {lv0:"辽宁",lv1:"",value:"沈阳"},
    {lv0:"辽宁",lv1:"",value:"大连"},
    {lv0:"黑龙江",lv1:"",value:"哈尔滨"},
    {lv0:"黑龙江",lv1:"",value:"大庆"},

    {lv0:"辽宁",lv1:"沈阳",value:"沈北"},
    {lv0:"辽宁",lv1:"沈阳",value:"淮南"},

    {lv0:"辽宁",lv1:"大连",value:"连东"},
    {lv0:"辽宁",lv1:"大连",value:"连西"},

    {lv0:"黑龙江",lv1:"哈尔滨",value:"道里"},
    {lv0:"黑龙江",lv1:"哈尔滨",value:"道外"},

    {lv0:"黑龙江",lv1:"大庆",value:"庆南"},
    {lv0:"黑龙江",lv1:"大庆",value:"庆北"},
])


</script>
<style scoped lang='scss'>

</style>