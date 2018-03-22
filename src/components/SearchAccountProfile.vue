<template>
  <div>
    <input type="text" id="input_account"/>
    <button v-on:click="getRecentMatchesByAccount">search</button>
 <!--     <ul>
          <li v-for="item in items">
              {{item}}
          </li>
      </ul>-->
  </div>
</template>

<script>
import 'whatwg-fetch';
export default {
  name: 'search-account-profile',
  data () {
      /*items:[
          { message: 'Foo' },
          { message: 'Bar' }
      ]*/
  },
  methods: {
    getRecentMatchesByAccount: function () {
      let account = document.getElementById('input_account').value;
      console.log(account);
      fetch('/api/player/getRecentMatchesByAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({account: account})
      }).then((res) => {
        return res.json();
      }).then((data) => {
       // console.log(data);
        this.playerRecent25Matches=data;
        console.log(this.playerRecent25Matches);
      });
    }
  }
};
</script>

<style scoped>

</style>
