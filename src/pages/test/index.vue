<template>
    <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        row-key="id"
        border
        style="width: 100%"
        @expand-change="open"
    >
        <el-table-column type="" prop="name" label="Name" />
        <el-table-column prop="amount1" label="Amount 1" />
        <el-table-column prop="amount2" label="Amount 2" />
        <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
    <bugDetails :data="textData"></bugDetails>
</template>

<script setup>
import bugDetails from "../../components/bugDetails.vue";
import { ref, reactive, onMounted } from "vue";
onMounted(() => {
    as();
});

let textData = ref({ name: "element-plus表格单元格合并&树形结构展开问题", text: "fdsfdsfds" });

let arr = reactive([]);
const open = (row, expandedRows) => {
    tableData.forEach((item) => {
        if (item.id == row.id) {
            item.tag = true;
            if (item.hasOwnProperty("children")) {
                item.children.forEach((items, d) => {
                    items.tag = expandedRows;
                });
            }
        }
    });
    as();
};

let data = reactive([]);
const as = () => {
    data.length = 0;
    tableData.forEach((item) => {
        let id = item.id;
        let name = item.name;
        let tag = item.tag;
        data.push({ id, name, tag });
        if (item.hasOwnProperty("children")) {
            item.children.forEach((items) => {
                let id = items.id;
                let name = items.name;
                let tag = items.tag;
                data.push({ id, name, tag });
            });
        }
    });
    ass();
};

let spanArr = reactive([]);
let pos = reactive(0);
const ass = () => {
    spanArr.length = 0;
    data.forEach((item, i) => {
        if (i == 0) {
            spanArr.push(1);
            pos = 0;
        } else {
            if (item.tag == true && item.name == data[pos].name) {
                spanArr[pos] += 1;
            }
            if (data[i].name === data[i - 1].name) {
                spanArr.push(0);
            } else {
                spanArr.push(1);
                pos = i;
            }
        }
    });
};

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex == 0) {
        const _row = spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
            rowspan: _row,
            colspan: _col,
        };
    }
};

const tableData = reactive([
    {
        id: "1",
        name: "Tom",
        amount1: "234",
        amount2: "3.2",
        amount3: 10,
        tag: true,
        children: [
            {
                id: "1-1",
                name: "Tom",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
    {
        id: "2",
        name: "Tom",
        amount1: "165",
        amount2: "4.43",
        amount3: 12,
        tag: true,
        children: [
            {
                id: "2-1",
                name: "Tom",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
    {
        id: "3",
        name: "Tom",
        amount1: "324",
        amount2: "1.9",
        amount3: 9,
        tag: true,
        children: [
            {
                id: "3-1",
                name: "Tom",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
    {
        id: "4",
        name: "John",
        amount1: "621",
        amount2: "2.2",
        amount3: 17,
        tag: true,
        children: [
            {
                id: "4-1",
                name: "John",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
    {
        id: "5",
        name: "John",
        amount1: "539",
        amount2: "4.1",
        amount3: 15,
        tag: true,
        children: [
            {
                id: "5-1",
                name: "John",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
    {
        id: "6",
        name: "John",
        amount1: "539",
        amount2: "4.1",
        amount3: 15,
        tag: true,
        children: [
            {
                id: "6-1",
                name: "John",
                amount1: "324",
                amount2: "1.9",
                amount3: 9,
                tag: false,
            },
        ],
    },
]);
</script>
<style scoped lang='less'>
</style>