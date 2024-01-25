<template>
    <div class="card">
        <div class="card-title flex_between_0">
            <div class="flex_1_0">
                <img class="title-img" src="@/assets/image/fx.png" style="width:20px;height:20px;margin-right:5px;">
                <div class="title-text">{{props.title}}</div>
            </div>
            <div>
                <slot name="cardTitle"></slot>
            </div>
        </div>
        <div class="card-main">
            <slot name="cardMain"></slot>
        </div>
    </div>    
</template>

<script setup>
const props = defineProps({
    title: String
})
</script>
<style scoped lang='scss'>
.card{
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid;
    @include bg_color();
    @include border_color();
    .card-title{
        padding: 20px;
        height: 50px;
        border-bottom: 1px solid;
        @include border_color();
        .title-text{
            font-size: 14px;
        }
    }
    .card-main{
        padding: 20px;
        min-height: 80px;
    }

}
</style>