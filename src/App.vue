<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
      <div class="content">
          <img class="logo" src="./assets/img/Items/refresher_lg.png">

          <div v-if="!nick_name" class="sign">
              <router-link to="/signup" >sign up</router-link>
              <router-link to="/signin">sign in</router-link>
          </div>
          <div v-if="nick_name" class="sign dropdown">
              <div class="dropdown-btn">{{nick_name}}</div>
              <div  class="dropdown-content">
                  <div v-on:click="toPlayerPage(account_id)">my profile </div>
                  <div v-on:click="signout">exit</div>
              </div>
          </div>

          <nav>
              <router-link to="/" >HOME</router-link>
              <!--  <router-link to="/player/121320102">player</router-link>-->
              <router-link to="/parent_component">parent component</router-link>
              <router-link to="/404">404</router-link>
          </nav>

      </div>

      <hr/>


      <div class="content">
          <router-view/>
      </div>



  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
  name: 'App',
    data(){
        return{

        }
    },
    created:function () {
      console.log('create');

        let nick_name=localStorage.getItem('user');
        let user_id=localStorage.getItem('user_id');
        console.log(nick_name);
        this.$store.dispatch('actionGetUser',nick_name);
        this.$store.dispatch('actionGetUserID',user_id);

        if(this.user_id){
            console.log('do action get account id ;');
            this.$store.dispatch('actionGetAccountID',this.user_id);
        }

    },
        computed: {
            ...mapGetters({
                account_id: 'getterAccountID',
                user_id: 'getterUserID',
                nick_name:'getterUser'
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
            this.$store.dispatch('actionGetUser',null);
            this.$store.dispatch('actionGetUserID',null);
        }

    },
        updated:function(a,b,c,d,e){
            console.log('something update');
        },
       watch:{
        user_id:function (n,o) {
            console.log('WATCH>' ,n);
            this.user_id=n;
            if(n){
                this.$store.dispatch('actionGetAccountID',n);
            }

            },
           nick_name:function (n, o) {
            console.log('WATCH > nick_name ',n);
               this.nick_name=n;
           }
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

    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown-content div:hover{
        background: rgba(70, 100, 127, 0.91);
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
