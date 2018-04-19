<template>
    <div class="content">
        <input type="text" id="input_account" v-model="account_id" placeholder="输入玩家的id"/>
        <router-link v-bind:to="{name:'player', params:{account_id:account_id}}">
            <button>search{{account_id}}</button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                account_id:null
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
