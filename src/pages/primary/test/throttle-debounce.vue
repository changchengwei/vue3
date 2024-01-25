<template>
    <bugSlot :msg="'B'">
        <template #bugShow>
            <button @click="throttleclick">节流</button>
            <button @click="debounceclick">防抖</button>
            <span>{{debounceText}}</span>
            <span>{{throttleText}}</span>
        </template>
        <template #bugText>
            <bugDetails :data="textDataObj.throttleDebounce"></bugDetails>
        </template>
    </bugSlot>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import textDataObj from "@/axios/data.js";


let debounceText = ref("")
let throttleText = ref("")

// 防抖 只会在点击操作停止后2秒触发函数
function debounce() {
  let timer
  let a = 0
  return function() {
    clearTimeout(timer )
    timer  = setTimeout(()=>{
        console.log("防抖")
        a++
        debounceText.value = "防抖" +a
    },2000)
  };
}
// 节流 无论点击多少次，每过两秒执行一次函数
function throttle() {
  let timer
  let a = 0
  return function() {
    if (!timer) {
        timer = setTimeout(() => {
            console.log("节流")
            a++
            throttleText.value = "节流" +a
            timer = null
        }, 2000);
    }
  };
}
const debounceclick = debounce()
const throttleclick = throttle()
</script>
<style scoped lang='scss'>

</style>