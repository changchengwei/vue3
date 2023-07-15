<template>
  <div class="bugDetails">
    <el-collapse>
        <el-collapse-item :title="data.name">
            <div>
                {{data.text}}
            </div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs} from 'vue'
let props = defineProps({data:Object})
let data = ref(props.data)
</script>
<style scoped lang='less'>
.bugDetails{
    width: 100%;
    margin: 5px 0px;
}
</style>