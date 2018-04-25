<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <input type="text" id="input_account" v-model="account_id" placeholder="输入玩家的id"/>
        <!--<router-link to="/player/121320102">123</router-link>-->

    <button v-on:click="toPlayerPage(account_id)">search{{account_id}}</button>

    </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                account_id:null
            }
        },
        methods:{
            toPlayerPage:function (account_id) {
                console.log(account_id);
                this.$router.push({ path: `/player/${account_id}` });
            }
        }
    }
</script>

<style scoped>
    .content{
        width: 80%;
        margin: 0 auto;
    }
</style>
