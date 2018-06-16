<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml"
          xmlns:disabled="http://www.w3.org/1999/xhtml">
<div class="content">
    <div class="signup_section">
        <h2>Sign up</h2>
        <form id="signup_form"   v-on:submit="submitUser">
            <p>
            {{form_errors}}
            </p>
            <div class="form_item">
                <input type="email" v-model="email" placeholder="email" required v-on:blur="checkForm">
            </div>
            <div class="form_item">
                <input type="text" v-model="nick_name" placeholder="nick name" required v-on:blur="checkForm" min="2" max="24">
            </div>
            <div class="form_item">
                <input type="password" v-model="password" placeholder="password" required v-on:blur="checkForm">
            </div>


                <button type="submit" class="signup_btn"  v-if="!submitted">Sign up</button>
            <button class="submitted_btn"  v-if="submitted" >WAITING...</button>
        </form>
    </div>

</div>
</template>

<script>
export default {
    name: "Signup",
    data() {
        return {
            account: null,
            password: null,
            email: null,
            nick_name: null,
            form_errors: null,
            submitted: false
        };
    },
    filters: {
        lowercase: function(value) {
            if (!value) return "";
            value = value.toLowerCase();
            return value;
        }
    },
    methods: {
        checkForm: function() {
            this.form_errors = null;
            this.checkPwd();
            this.checkNickName();
            this.checkEmail();
        },
        /**
         * 提交
         * */
        submitUser: function() {
            if (this.form_errors == null) {
                console.log("SUBMIT");
                this.submitted = true;

                console.log(this.password);
                console.log(this.email);
                console.log(this.nick_name);
                let user = {
                    password: this.password,
                    email: this.email,
                    nick_name: this.nick_name.toLowerCase()
                };
                fetch("/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.registerResult == 200) {
                            alert("sign up success");

                            this.$router.push({ path: `/signin` });
                        }
                    });
            }
        },

        checkAccount: function() {
            let _self = this;
            let account = this.account;
            if (!this.account) {
                this.form_errors = "未填写账号";
                return;
            } else {
                let reg = /^[0-9a-zA-Z_-]*$/;
                if (reg.test(this.account)) {
                    console.log(`account true`);
                    //查询重复用户名
                    fetch("/api/users/check_account", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ account: account })
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            console.log(typeof data.result);
                            let result = data.result;
                            if (result == 1) {
                                _self.form_errors = "已有此账号";
                                return;
                            } else {
                                return;
                            }
                        });
                } else {
                    this.form_errors = "账号格式错误";
                    return;
                }
            }
            //  _self.form_errors=[];
        },

        checkPwd: function() {
            if (!this.password) {
                this.form_errors = "未填写密码";
            } else {
                let reg = /^[0-9a-zA-Z]{6,30}$/;
                if (reg.test(this.password)) {
                    console.log("password true");
                } else {
                    this.form_errors = "密码格式错误";
                }
            }
        },

        checkNickName: function() {
            let _self = this;
            let nick_name = this.nick_name;

            if (!this.nick_name) {
                this.form_errors = "未填写昵称";
                return;
            } else {
                console.log(`nick name length ${this.nick_name.length}`);
                if (this.nick_name.length < 2) {
                    this.form_errors = "昵称长度错误";
                    return;
                } else {
                    fetch("/api/users/check_nickname", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ nick_name: nick_name })
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            console.log(typeof data.result);
                            let result = data.result;
                            if (result == 1) {
                                _self.form_errors = "已有此昵称";
                                return false;
                            } else {
                            }
                        });
                }
            }
        },

        checkEmail: function() {
            let _self = this;
            let email = this.email;
            if (!this.email) {
                this.form_errors = "未填写邮箱";
            } else {
                var reg_email = /^([0-9a-z_-])+@([0-9a-z_-])+(.[0-9a-z_-]){2,}/i;
                if (reg_email.test(this.email)) {
                    fetch("/api/users/check_email", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email: email })
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            console.log(typeof data.result);
                            let result = data.result;
                            if (result == 1) {
                                _self.form_errors = "已有此邮箱";
                                return false;
                            } else {
                                return;
                            }
                        });
                } else {
                    this.form_errors = "邮箱格式错误";
                    return;
                }
            }
        }
    }
};
</script>

<style scoped>
.signup_section {
    height: 400px;
    margin: 0 auto;
    width: 529px;
}
form {
    margin: 2rem auto;
    display: flex;
    justify-items: center;
    flex-direction: column;
    height: 500px;
    align-items: center;
    width: 529px;
}
.form_item {
    margin: 1em auto;
    border: 0;
    width: 60%;
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
.signup_btn {
    padding: 3px 5px;
    width: 200px;
    height: 2.6em;
    outline: none;
    margin: 0 auto;
    color: #ffffff;
    background: #d68704;
    border: 0;
    border-radius: 3px;
}

/*  ==========<500PX========== */
@media (max-width: 500px) {
    .signup_section {
        height: 400px;
        margin: 0 auto;
        width: 100%;
    }
    form {
        margin: 0 auto;
        display: flex;
        justify-items: center;
        flex-direction: column;
        height: 500px;
        align-items: center;
        width: 90%;
    }
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
    .signup_btn {
        padding: 3px 5px;
        width: 100%;
        height: 2.6em;
        outline: none;
        margin: 0 auto;
        color: #ffffff;
        background: #d68704;
        border: 0;
        border-radius: 3px;
    }
    .submitted_btn {
        padding: 3px 5px;
        width: 100%;
        height: 2.6em;
        outline: none;
        margin: 0 auto;
        color: #ffffff;
        background: #838282;
        border: 0;
        border-radius: 3px;
    }
}
</style>
