<template>
<div class="content">
    <form v-on:submit="subBindAccountID">
        bind A  player account:
        <input type="text" v-model="bind_account"  placeholder="enter your account id "/>
        <button type="submit" >bind the account</button>
    </form>

</div>
</template>

<script>
    export default {
        name: "bindAccountID",
        data(){
            return{
                bind_account:null,
                user_id:null
            }
        },

        mounted:function(){
            console.log('mounted');
            this.user_id=localStorage.getItem("user_id");
            this.checkSignin();
        },
    methods:{
            checkSignin:function () {
                let token=localStorage.getItem("token");
                console.log(token);
                fetch('/api/users/heart',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': token
                    }
                }).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    console.log(data);
                });
            },
        subBindAccountID:function () {
            let token=localStorage.getItem("token");
            let bind_account = this.bind_account;
            let user_id=this.user_id;
            fetch('/api/users/bindAccount',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': token
                },
                body:JSON.stringify({bind_account:bind_account,user_id:user_id})
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                if(data.ret_code==0){
                    alert('bind success');
                    this.$router.push({path:`/`});
                }else{
                    alert(data.ret_msg);
                }
            });
        }
    }
    }
</script>

<style scoped>

</style>
