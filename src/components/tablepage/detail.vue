<template>
    <div>
        <div>详情页</div>
        <div>
            传过来的参数：{{personInfo}}
        </div>
    </div>
</template>
<style>

</style>

<script>
export default {
    name: 'detail',
    data() {
        return {
            personInfo:this.$route.query,
        }
    },
    mounted(){

    },
    methods: {

    }
}
</script>
