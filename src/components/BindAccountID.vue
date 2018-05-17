<template>
<div>
    bind A  player account;
</div>
</template>

<script>
    export default {
        name: "bindAccountID",
        data(){
            return{

            }
        },

        mounted:function(){
            console.log('mounted');
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
                    },
                    body:JSON.stringify({token:token})
                }).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    console.log(data);
                });
            }
    }
    }
</script>

<style scoped>

</style>
