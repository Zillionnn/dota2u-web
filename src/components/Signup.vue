<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<div class="content">
    <div class="signup_section">
        <h2>Sign up</h2>
        <form id="signup_form"   v-on:submit="checkForm">
            <p>
            <ul>
            <li v-for="item in form_errors">{{item}}</li>
        </ul>
            </p>
            <div class="form_item">
                <input type="text" v-model.trim="account" placeholder="account" required >
            </div>
            <div class="form_item">
                <input type="text" v-model="nick_name" placeholder="nick name" required>
            </div>
            <div class="form_item">
                <input type="password" v-model="password" placeholder="password" required>
            </div>
            <div class="form_item">
                <input type="email" v-model="email" placeholder="email" required>
            </div>

                <button type="submit" class="signup_btn">Sign up</button>

        </form>
    </div>

</div>
</template>

<script>
    export default {
        name: "Signup",
        data(){
            return{
                account:null,
                password:null,
                email:null,
                nick_name:null,
                form_errors:[]
            }
        },
        filters: {
            lowercase: function (value) {
                if (!value)
                    return '';
                value = value.toLowerCase();
                return value;
            }
        },
        methods:{
            checkForm:function (e) {
                console.log('click');
                this.form_errors=[];
                if(!this.account){
                    this.form_errors.push('未填写账号');
                }else {
                    let reg=/^[0-9a-zA-Z]*$/;
                    if(reg.test(this.account)){
                        console.log(`account true`);
                    }else{
                        reg.test(this.account);
                        this.form_errors.push('账号格式错误');
                    }
                }

                if(!this.password){
                    this.form_errors.push('未填写密码');
                }else{
                    let reg=/^[0-9a-zA-Z]{6,30}$/;
                    if(reg.test(this.password)){
                        console.log('password true');
                    }else{
                        this.form_errors.push('密码格式错误');
                    }
                }

                if(!this.email){
                    this.form_errors.push('未填写邮箱');
                }else{
                    var reg_email=/^([0-9a-z_-])+@([0-9a-z_-])+(.[0-9a-z_-]){2,}/i;
                    if(reg_email.test(this.email)){

                    }else{
                        this.form_errors.push('邮箱格式错误');
                    }
                }
                this.submitUser();
                e.preventDefault();
            },
            submitUser:function () {
                if(this.form_errors.length==0){
                    console.log('SUBMIT');
                    console.log(this.account);
                    console.log(this.password);
                    console.log(this.email);
                    console.log(this.nick_name);
                    let user={
                        account:this.account.toLowerCase(),
                        password:this.password,
                        email:this.email,
                        nick_name:this.nick_name.toLowerCase()
                    };
                    fetch('/api/users/signup',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    }).then((res)=>{
                        return res.json();
                    }).then((data)=>{
                        console.log(data);
                        if(data.registerResult==200){
                            alert('sign up success');
                        }
                    });
                }

            }
        }
    }
</script>

<style scoped>
    .signup_section{
        height: 400px;
        margin: 0 auto;
        width: 529px;
    }
    form{
        margin: 2rem auto;
        display: flex;
        justify-items: center;
        flex-direction: column;
        height: 500px;
       align-items: center;
        width: 529px;

    }
.form_item{
    margin: 1em auto;
    border: 0;
    width: 60%;
    height:3em;
}
    .form_item input{
        border:1px solid #e0e0e0;
        color: #656565;
        width: 99%;
        height:2em;
        border-radius: 3px;
        outline: none;
        padding: 3px 5px;
    }
    .signup_btn{
        padding: 3px 5px;
        width: 200px;
        height:2.6em;
        outline: none;
        margin: 0 auto;
        color: #ffffff;
        background: #d68704;
        border: 0;
        border-radius: 3px;
    }
</style>
