<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <div class="signup_section">
            <h2>Sign in</h2>
            <form id="signup_form"   v-on:submit="signIn">
          <!--      <p>
                    {{form_errors}}
                </p>-->
                <div class="form_item">
                    <input type="email" v-model="email" placeholder="email" required >
                </div>

                <div class="form_item">
                    <input type="password" v-model="password" placeholder="password" required >
                </div>


                <button type="submit" class="signup_btn"  v-if="!submitted">Sign in</button>
                <button class="submitted_btn"  v-if="submitted" >WAITING...</button>
            </form>
        </div>

    </div>

</template>

<script>
    import {mapGetter,mapActions} from 'vuex';

    export default {
        name: "Signin",
        data(){
            return{
                email:null,
                password:null,
                submitted:false
            }
        },
        methods:{
            signIn:function () {
                let email=this.email;
                let password=this.password;
                let signInInfo={
                  email:email.toLowerCase(),
                  password:password
                };
                fetch('/api/users/signin',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(signInInfo)
                }).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    console.log(data.ret_code==0);
                    localStorage.setItem("token",data.ret_msg);
                    localStorage.setItem("user",data.nick_name);
                    localStorage.setItem("user_id",data.user_id);
                    this.$store.dispatch('actionGetUserID',data.user_id);
                    this.$store.dispatch('actionGetUser',data.nick_name);
                    this.$router.push({ path: `/` });
                });
            }
        }
    }
</script>

<style scoped>

</style>
