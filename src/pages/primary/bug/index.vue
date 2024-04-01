<template>
    <el-button>确定</el-button>
</template>

<script setup>
let a = [1,2,3]
let b = a
a.push(4)
console.log(a)
console.log(b)

// promies 
const fn1 = (resolve, reject) => {
    setTimeout(()=>{
      resolve("fn1 -- 函数被执行")
    },2000)
}
const fn2 = (resolve, reject) => {
    setTimeout(()=>{
      resolve("fn2 -- 函数被执行")
    },1000)
}
const fn3 = (resolve, reject) => {
    setTimeout(()=>{
      resolve("fn3 -- 函数被执行")
    },3000)
}
new Promise(fn1).then((res) => {
    console.log(res)
    return new Promise(fn3)
}).then((res) => {
    console.log(res)
    return new Promise(fn2)
}).then((res) => {
    console.log(res)
})



</script>
<style scoped lang='scss'>

</style>