<template>
  <div id="app">
      <div class="content">
          <img src="./assets/img/hero_icon/shadow_demon_hphover.png">
          <router-link to="/">HOME</router-link>
        <!--  <router-link to="/player/121320102">player</router-link>-->
          <router-link to="/parent_component">parent component</router-link>
          <router-link to="/404">404</router-link>
      </div>

      <hr/>


      <div class="content">
          <router-view/>
      </div>



  </div>
</template>

<script>
import Player from './components/Player.vue';
import Index from './components/Index';

export default {
  components: {Player,Index},
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #d1cecf;
  margin-top: 60px;
}
  a{
    color: #eed221;
  }
    .content{
        width: 80%;
        margin: 0 auto;
    }
</style>
