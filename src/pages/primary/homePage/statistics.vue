<template>
    <div class="statistics">
        <div class="statistics-item">
            <card :title="'流量概况'">
                <template #cardMain>
                    <div id="flow" style="width:100%;height:180px"></div>
                </template>
            </card>
        </div>
        <div class="statistics-item">
            <card :title="'授权数'">
                <template #cardMain>
                    <div id="authorization" style="width:100%;height:180px"></div>
                </template>
            </card>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import * as echarts from 'echarts';
onMounted(() => {
    getChartDom()
})
let option = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    yAxis: {
        splitLine: {show: false},
        type: 'value'
    },
    grid: {
        show:false,
        x: 30,
        y: 20,
        x2: 20,
        y2: 20
    },
    series:{
        data: [20, 32, 91, 34, 90, 30],
        type: '',
        smooth: true
    }
})

const getChartDom = () => {
    option.series.type = 'bar'
    const flow = echarts.init(document.getElementById('flow'))
    flow.setOption(option)
    option.series.type = 'line'
    const authorization = echarts.init(document.getElementById('authorization'))
    authorization.setOption(option)
}
</script>
<style scoped lang='scss'>
.statistics{
    display: flex;
    justify-content: space-between;
    .statistics-item{
        width: 49%;
    }
}
</style>