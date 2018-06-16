// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(colors)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: function (createElement) {
    return createElement(
      'App'
    );
  }
});
