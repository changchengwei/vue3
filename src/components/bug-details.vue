<template>
    <div class="bugDetails">
        <el-collapse>
            <el-collapse-item>
                <template #title>
                    <div class="title text">
                        <el-icon><WarningFilled /></el-icon>
                        <span>{{ data.name }}</span>
                        <!-- <el-button type="warning" text>{{"</>"}}</el-button> -->
                    </div>
                </template>
                <div class="text">
                    <div>{{ data.text }}</div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";

let props = defineProps({ data: Object });
let data = ref(props.data);
</script>
<style lang='scss'>
.bugDetails {
    width: 100%;
    .title {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .text {
        font-size: 16px;
        padding: 0px 20px;
    }
    .el-collapse-item__header,
    .el-collapse-item__content {
        @include button1_color();
    }
}
</style>