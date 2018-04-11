<template>
  <div id="app">
      <div class="content">
          <img src="./assets/img/hero_icon/shadow_demon_hphover.png">
          <router-link to="/">HOME</router-link>
          <router-link to="/parent_component">parent component</router-link>
          <router-link to="/404">404</router-link>
      </div>

      <hr/>

      <div class="content">
          <router-view/>
      </div>

    <br/>

  </div>
</template>

<script>
import SearchAccountProfile from './components/SearchAccountProfile';

export default {
  components: {SearchAccountProfile},
  name: 'App'
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
