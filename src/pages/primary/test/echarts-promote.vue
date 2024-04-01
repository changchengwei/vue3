<template>
    <bugSlot :msg="'B'">
        <template #bugShow>
            <div style="height:400px" id="promote"></div>
        </template>
        <template #bugText>
            <bugDetails :data="textDataObj.echartsPromoteData"></bugDetails>
        </template>
    </bugSlot>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import textDataObj from "@/axios/data.js";
import * as echarts from 'echarts';


onMounted(() => {
    as();
});


let a = 500;
let arr = reactive([]);
let ydata = reactive([]);
for(let i=0;i<a;i++){
    let s = Math.floor(Math.random()*1000)
    arr.push(s)
    ydata.push(s)
}
// console.log(xdata)
const lttb = () => {
    for(let i = 0; i < 500; i+=10){
        console.log(arr.slice(i,i+10))
        let sd = arr.slice(i,i+10)
        let max = Math.max.apply(null, sd);
        let min = Math.min.apply(null, sd);
        console.log(max, min);
        ydata.push()
    }
}
lttb()
const as = () =>{
    let chartDom = document.getElementById('promote');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        dataZoom: {
            type: 'slider',
            start: 0,
            end: 100
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: ydata,
            type: 'line',
            smooth: true,
            // sampling:'lttb',
            // sampling: ()=>{
            //     return 30
            // }
            }
        ],

    };

    option && myChart.setOption(option);
}
</script>
<style scoped lang='scss'>

</style>