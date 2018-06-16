<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <form >
            <input type="text" id="input_account" v-model="account_id"
                   placeholder="输入玩家的id"/>


            <button v-on:click="toPlayerPage(account_id)" class="searchButton">SEARCH</button>
        </form>


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

    #input_account{
        width: 200px;
        height: auto;
        border: 2px #e7e7e7;
        padding: 10px;
        border-radius: 3px;
        display: block;
        margin:3rem auto;
    }

    .searchButton{
        width: 220px;
        height:2.6em;
        outline: none;
        margin: 1rem auto;
        color: #ffffff;
        background: #4284d4;
        border: 0;
        padding: 5px;
        border-radius: 3px;

    }
    .searchButton:hover{
        width: 220px;
        height:2.6em;
        outline: none;
        margin: 1rem auto;
        color: #ffffff;
        background: #407cc9;
        border: 0;
        padding: 5px;
        border-radius: 3px;
    }
    .searchButton:active{
        width: 220px;
        height:2.6em;
        outline: none;
        margin: 1rem auto;
        color: #ffffff;
        background: #3769ac;
        border: 0;
        padding: 5px;
        border-radius: 3px;
    }
    .content{
        display: flex;
        font-family: "Gotham SSm",Helvetica,Arial,sans-serif;
        width: 90%;
        margin: 0 auto;
        justify-content:  center;
    }
    .content button{
        display: block;
    }

    @media (max-width: 500px) {
        #input_account{
            width: 100%;
            height: auto;
            border: 2px #e7e7e7;
            padding: 10px 0;
            border-radius: 3px;
        }
        .searchButton{
            width: 100%;
            height:2.6em;
            outline: none;
            margin: 1rem 0 0  0;
            color: #ffffff;
            background: #4284d4;
            border: 0;
            padding: 5px;
            border-radius: 3px;
        }
        .searchButton:hover{
            width: 100%;
            height:2.6em;
            outline: none;
            margin: 1rem 0 0  0;
            color: #ffffff;
            background: #407cc9;
            border: 0;
            padding: 5px;
            border-radius: 3px;
        }
        .searchButton:active{
            width: 100%;
            height:2.6em;
            outline: none;
            margin: 1rem 0 0  0;
            color: #ffffff;
            background: #3769ac;
            border: 0;
            padding: 5px;
            border-radius: 3px;
        }
    }
</style>
