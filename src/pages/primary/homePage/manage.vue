<template>
    <div class="manage">
        <card :title="'经营建议'">
            <template #cardMain>
                <div class="manage-card">
                    <div class="manage-item" v-for="item in data" :key="item">
                        <div>
                            <img src="@/assets/image/zl.png" style="width:50px;height:50px">
                        </div>
                        <div class="manage-text">
                            <div class="title">{{item.title}}</div>
                            <div class="explain">{{item.explain}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </card>
    </div>
</template>

<script setup>
import {ref, reactive} from 'vue'

const data = reactive([
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    },
    {
        icon:'',
        title:'工商建议',
        explain:'工商建议快捷入口'
    }
])

</script>
<style scoped lang='scss'>
.manage{
    .manage-card{
        display: flex;
        flex-wrap: wrap;
    }
    .manage-item{
        display: flex;
        align-items: center;
        width: 25%;
        flex-shrink: 0;
        margin: 15px 0px;
        .manage-text{
            margin-left: 10px;
            .explain{

            }
            .explain{
                font-size: 12px;
                margin-top: 5px;
                color: #909399;
            }
        }
    }
}
</style>