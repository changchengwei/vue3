<template>
    <bugSlot  :msg="'B'">
        <template #bugShow>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :http-request="putinMirror"
                >
                <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </template>

        <template #bugText>
            <bugDetails :data="textDataObj.upLoadData"></bugDetails>
        </template>
    </bugSlot>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import textDataObj from "@/axios/data.js";

// 断点续传  --  通过后台接口返回字段 判断当前文件是否上传过 如上传过通过拿到文件分片索引进行断点续传

const putinMirror = (file) => {
    // console.log(file)
    // 每个文件切片大小定为0.5MB
    let sliceSize = 0.5 * 1024 * 1024;
    // 文件大小限制为最大1个G，可根据需求修改
    let maxfilesizes  = 1 * 1024 * 1024 * 1024;
    // console.log('putinMirror:',file)
    const blob = file.file;
    // console.log(blob)
    const fileSize = blob.size;// 文件大小
    const fileName = blob.name;// 文件名
    //计算文件切片总数，Math.ceil向上取整数
    const totalSlice = Math.ceil(fileSize / sliceSize);
    // console.log('当前上传文件的详情信息',blob,totalSlice,fileSize,sliceSize)
    // 循环上传
    for(let i=0; i<totalSlice; i++){
        let start = i * sliceSize;
        // 使用 slice 进行文件切片
        let chunk = blob.slice(start, Math.min(fileSize, start + sliceSize));
        // console.log('每个切片的信息:'+ i + "-----",chunk);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("signal", blob.uid);
        formData.append("name", fileName);
        formData.append("size", fileSize);
        formData.append("chunks", totalSlice);
        formData.append("chunk", i+1);
        
        //uploadExcleAndZip模拟接口上传
        let res = uploadExcleAndZip(formData);
        
        // console.log(res);
        
        if(res.errCode == 0){
            //this.progress = ((i+1)/totalSlice).toFixed(1) * 100;//控制进度条
            setTimeout(()=>{
                if((i+1) == totalSlice){
                    // this.$message({
                    //     message: '上传成功',
                    //     type: 'success'
                    // });
                }
            }, 1000);
        }
    }
}
const uploadExcleAndZip = () => {
    return 1
}
</script>
<style scoped lang='scss'>

</style>