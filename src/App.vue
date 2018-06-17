<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">

      <div class="content">
          <v-toolbar >
              <v-toolbar-title class="white--text">
                 <!-- <img class="logo" src="./assets/img/Items/refresher_lg.png">-->
                  <div>DOTA2U</div>
              </v-toolbar-title>
              <v-toolbar-items>
                  <div  style="display: inline-block;position: relative; text-align: center">
                      <router-link to="/" >HOME</router-link>
                  </div>
                  <!--  <router-link to="/player/121320102">player</router-link>-->
                  <div  style="display: inline-block;position: relative; text-align: center">
                      <router-link to="/parent_component">parent component</router-link>
                  </div>
                  <div  style="display: inline-block;position: relative; text-align: center">
                      <router-link to="/404">404</router-link>
                  </div>
              </v-toolbar-items>
              <v-spacer></v-spacer>

                  <v-btn v-if="!nickName" v-on:click="toSignUp">sign up</v-btn>
                  <v-btn v-if="!nickName" v-on:click="toSignIn">sign in</v-btn>

              <div v-if="nickName" class="sign dropdown">
                  <div class="dropdown-btn">{{nickName}}</div>
                  <div  class="dropdown-content">
                      <div v-on:click="toPlayerPage(account_id)" class="dropdown-item">my profile </div>
                      <div v-on:click="signout" class="dropdown-item">exit</div>
                  </div>
              </div>


          </v-toolbar>

        <!--  <nav>
              <router-link to="/" >HOME</router-link>
              &lt;!&ndash;  <router-link to="/player/121320102">player</router-link>&ndash;&gt;
              <router-link to="/parent_component">parent component</router-link>
              <router-link to="/404">404</router-link>
          </nav>-->

      </div>




      <div class="content">
          <router-view/>
      </div>



  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
import  userApi from '@/api/users';

    export default {
  name: 'App',
    data(){
        return{
            heart: null
        }
    },
    created:function () {
      console.log('create');
        let nickName=localStorage.getItem('nickName');
        let user_id=localStorage.getItem('user_id');
        console.log(nickName);
        this.$store.dispatch('actionGetNickName',nickName);
        this.$store.dispatch('actionGetUserID',user_id);

        if(this.user_id){
            console.log('do action get account id ;');
            this.$store.dispatch('actionGetAccountID',this.user_id);
        }

          this.heart = setInterval(()=>{
             userApi.checkJWT().then((data)=>{
                 console.log(data);
                 //console.log(ret_code);
                 if(data !== 0){
                     alert('token expired');
                     this.signout();
                 }
             });

           },20000);

    },
        computed: {
            ...mapGetters({
                account_id: 'getterAccountID',
                user_id: 'getterUserID',
                nickName: 'getterNickName'
            })
        },

    methods:{
        toPlayerPage:function (account_id) {
            console.log(JSON.stringify(account_id));
            if(account_id==null){
                alert('did not bind A account');
                this.$router.push({path:`/bindaccount`});
            }else{
                this.$router.push({ path: `/player/${account_id}` });
            }

        },
        signout:function () {
            localStorage.clear();
            this.$store.dispatch('actionGetNickName',null);
            this.$store.dispatch('actionGetUserID',null);
            clearInterval(this.heart);
        },
        toSignUp: function () {
            this.$router.push({path:`/signup`});
        },
        toSignIn: function () {
            this.$router.push({path:`/signin`});
        }

    },
        updated:function(a,b,c,d,e){
            console.log('something update');
        }
};
</script>

<style>
    #app {
        font-family: 'Century Gothic', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #d1cecf;
        margin-top: 30px;
    }

    nav a {
        text-decoration: none;
        color: #d0d0d0;
        margin: 0 3rem;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.8rem;
    }
    nav a:hover{
        text-decoration: none;
        color: #d0d0d0;
        margin: 0 3rem;
        font-size: 1rem;
        line-height: 1.8rem;
        font-weight: bold;
        background: rgba(131,131,131,0.72);
    }

    .content {
        width: 80%;
        margin: 0 auto;
    }
    .sign{
        float:right;
        cursor: pointer;
        width: 120px;
        height: auto;
        text-align: center;
    }
    .sign a{
        color: #d1cecf;
    }

    .dropdown{
        position: relative;
        display: inline-block;
    }
    .dropdown-btn{
        min-width: 160px;
        border: none;
        cursor: pointer;
    }
    .dropdown-content{
        display: none;
        position: absolute;

        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }
    .dropdown-content div{
        margin: 6px auto;
    }
    .dropdown-item{
        line-height: 2.5rem;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown-content div:hover{
        background: rgba(70, 100, 127, 1);
    }

    .sign ul{
        list-style: none;
    }

    @media (max-width: 500px) {
        .logo{
            margin: 0 auto;
            display: block;
        }
    }

</style>
