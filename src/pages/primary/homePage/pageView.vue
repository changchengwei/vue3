<template>
    <div class="pageView flex_between_0">
        <div class="pageView-item flex_between_0 tergum" v-for="item in obj" :key="item">
            <div>
                <div class="title">{{item.title}}</div>
                <div class="flex_between_0 con">
                    <div v-focus='3000'>{{item.visitData}}</div>
                </div>
                <div class="contrast flex_1_0">
                    <span>自上周以来</span>
                    <el-icon color="#13ce66"><Top /></el-icon>
                    <span class="contrast-item">{{item.contrastData}}</span>
                </div>
            </div>
            <div v-if="item.id !== 1">
                <img src="@/assets/image/fx.png" style="width:80px;height:80px">
            </div>
            <div v-else id="main" style="width:50%;height:100%;"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useRouter } from "vue-router"
import http from "@/axios/http.js"
import store from "@/store/index.js"
import { dayjs } from 'element-plus'
import * as echarts from 'echarts'

const router = useRouter()

onMounted(() => {
    getChartDom()
    setInterval(() => {
        seriesType.value == 'bar' ? seriesType.value = 'line': seriesType.value = 'bar'
        getChartDom()
    }, 5000)
    
})
let seriesType = ref('line')
const getChartDom = () => {
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
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
            x: 0,
            y: 0,
            x2: 0,
            y2: 0
        },
        series:{
            data: [20, 32, 91, 34, 90, 30],
            type: seriesType.value,
            smooth: true
        }
    })
    myChart.setOption(option)
}

const obj = reactive([
    {
        id:0,
        title:'总访问量',
        visitData:123423,
        contrastData:'40%',
        icon:'fx',
    },
    {
        id:1,
        title:'今日问量',
        visitData:32,
        contrastData:'40%',
        icon:'sj',
    },
    {
        id:2,
        title:'总成交量',
        visitData:32,
        contrastData:'40%',
        icon:'wl',
    },
    {
        id:3,
        title:'今日订单',
        visitData:4343,
        contrastData:'40%',
        icon:'zl',
    }
])

</script>
<style scoped lang='scss'>
.pageView{
    margin-top: 20px;
    .pageView-item{
        // background-image: linear-gradient(to left, #fff, #337ecc);
        width: 24%;
        padding: 20px;
        .title{
            font-size: 14px;
        }
        .con{
            font-size: 30px;
            margin: 20px 0px;
        }
        .contrast{
            .contrast-item{
                color: #13ce66;
            }
            .el-icon{
                margin: 0px 3px 0px 5px;
            }
        }
    }
}
</style>