const textDataObj = {
    formMergingData:{
        name: "element-plus表格单元格合并&树形结构展开同时使用时，会出现标个位置错乱的问题",
        text: "通过--设置一个tag开关属性来判断当前行是否展开，在通过span-method属性计算返回展开的行数及需合并的行。",
    },
    upLoadData:{
        name: "对大文件采取分片上传的方式，展示上传进度条，并实现断点续传，提高文件上传稳定性",
        text: "分片上传 --  通过slice方法把文件进行分片，上传参数：分片索引 分片总数，文件唯一标识，文件名；注意点：分片总数要进行向上取整 避免丢失数据。最后一片截取索引应为文件最大字节。断点续传  --  通过后台接口返回字段 判断当前文件是否上传过 如上传过通过拿到文件分片索引进行断点续传",
    },
    echartsPromoteData:{
        name: "echarts折线图、柱状图，优化图表渲染解决大数据量导致卡顿加载时间慢等问题",
        text: "",
    },
    throttleDebounce:{
        name: "节流防抖（时间间隔均为2s）",
        text: "节流 无论点击多少次，每过两秒执行一次函数；防抖 只会在点击操作停止后2秒触发函数；",
    }
}

export default textDataObj