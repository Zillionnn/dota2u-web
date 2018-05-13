<template>
  <div id="app">
      <div class="content">
          <img class="logo" src="./assets/img/Items/refresher_lg.png">
          <nav>
              <router-link to="/" >HOME</router-link>
              <!--  <router-link to="/player/121320102">player</router-link>-->
              <router-link to="/parent_component">parent component</router-link>
              <router-link to="/404">404</router-link>
              <router-link to="/signup">sign up</router-link>
          </nav>

      </div>

      <hr/>


      <div class="content">
          <router-view/>
      </div>



  </div>
</template>

<script>
export default {
  name: 'App',
    data(){
        return{
            account_id:null
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

    @media (max-width: 500px) {
        .logo{
            margin: 0 auto;
            display: block;
        }
    }
</style>
