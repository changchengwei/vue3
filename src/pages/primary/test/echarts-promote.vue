<template>
    <bugSlot :msg="'B'">
        <template #bugShow>
            <div style="height:400px" id="main"></div>
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


let a = 10000;

let xdata = reactive([]); 
let ydata = reactive([]);

for(let i=0;i<a;i++){
    xdata.push(i);
    let sut = getRandomNumber();
    ydata.push(sut);
}
// console.log(xdata)
// console.log(ydata)

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}
const as = () =>{
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        xAxis: {
            type: 'category',
            data: xdata
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: ydata,
            type: 'line',
            smooth: true
            }
        ]
    };

    option && myChart.setOption(option);
}
</script>
<style scoped lang='scss'>

</style>