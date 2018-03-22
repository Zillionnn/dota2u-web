<template>
  <div id="app">
  <!--  <img src="./assets/img/hero_icon/shadow_demon_hphover.png">-->
    <router-link to="/">HOME</router-link>
    <router-link to="/helloworld">helloworld page</router-link>
    <router-link to="/404">404</router-link>
    <router-view/>
    <br/>
    <hr/>
    <search-account-profile />
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
</style>
