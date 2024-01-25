<template>
    <div class="bugSlot">
        <div class="bugSlot-title-a" v-show="'A' == props.msg">
            <div>bug展示</div><div>处理后</div>
        </div>
        <div class="bugSlot-title-b" v-show="'B' == props.msg">
            <div>优化处理</div>
        </div>
        <div class="bugSlot-item bugSlot-item-a" v-show="'A' == props.msg">
            <div>
                <slot name="bugUp"></slot>
            </div>
            <div>
                <slot name="bugDown"></slot>
            </div>
        </div>
        <div class="bugSlot-item bugSlot-item-b" v-show="'B' == props.msg">
            <slot name="bugShow"></slot>
        </div>
        <div class="bugSlot-text">
            <slot name="bugText"></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    msg: String
})
// console.log(props.msg)
</script>
<style scoped lang='scss'>
.bugSlot{
    margin-bottom: 20px;
    border: 1px solid ;
    @include border_color();
    border-radius: 6px;
    overflow: hidden;
    .bugSlot-title-a{
        display: flex;
        height: 35px;
        @include button1_color();
        div{
            width: 50%;
            text-align: center;
            line-height: 35px;
        }
    }
    .bugSlot-title-b{
        text-align: center;
        line-height: 35px;
        @include button1_color();
    }
    .bugSlot-item{
        padding: 20px;
        @include bg_color();
    }
    .bugSlot-item-a{
        display: flex;
        justify-content: space-between;
        div{
            width: 47%;
        }
    }
    .bugSlot-item-b{

    }
    .bugSlot-text{

    }
}
</style>
