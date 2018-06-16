<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <div class="signup_section">
            <h2>Sign in</h2>
            <form id="signin_form"   v-on:submit="signIn">
          <!--      <p>
                    {{form_errors}}
                </p>-->
                <div class="form_item">
                    <input type="email" v-model="email" placeholder="email" required >
                </div>

                <div class="form_item">
                    <input type="password" v-model="password" placeholder="password" required >
                </div>


                <v-btn color="teal lighten-1" type="submit"   v-if="!submitted">Sign in</v-btn>
                <v-btn class="submitted_btn"  v-if="submitted" >WAITING...</v-btn>
            </form>
        </div>

    </div>

</template>

<script>
import { mapGetter, mapActions } from "vuex";

export default {
    name: "Signin",
    data() {
        return {
            email: null,
            password: null,
            submitted: false
        };
    },
    methods: {
        signIn: function() {
            let email = this.email;
            let password = this.password;
            let signInInfo = {
                email: email.toLowerCase(),
                password: password
            };
            fetch("/api/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signInInfo)
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    if (data.ret_code == 0) {
                        localStorage.setItem("token", data.ret_msg);
                        localStorage.setItem("nickName", data.nick_name);
                        localStorage.setItem("user_id", data.user_id);
                        this.$store.dispatch("actionGetUserID", data.user_id);
                        this.$store.dispatch("actionGetNickName", data.nick_name);
                        this.$router.push({ path: `/` });
                    } else {
                        alert(data.ret_msg);
                    }
                });
        }
    }
};
</script>

<style scoped>
    .form_item {
        margin: 0.5em auto;
        border: 0;
        width: 100%;
        height: 3em;
    }
    .form_item input {
        border: 1px solid #e0e0e0;
        color: #656565;
        width: 99%;
        height: 2em;
        border-radius: 3px;
        outline: none;
        padding: 3px 5px;
    }
    .signup_section {
        height: 400px;
        margin: 0 auto;
        width: 529px;
        margin-top: 2rem;
    }
    #signin_form{
        width: 60%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
    }
</style>
