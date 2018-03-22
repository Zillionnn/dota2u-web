<template>
  <div id="hello">
    <p>A template</p>
    <h3>{{c}}</h3>
    <p v-if="c">you can see me</p>
    <span>c:{{c}}</span>
    <p>a:{{a}}</p>
    <button v-on:click="c+=1">click</button>
    <br/>
    <input v-model="parentMsg"/><br/>
<child v-bind:my-message="parentMsg" v-on:message="handleMessage"></child>
  </div>
</template>
<script>
import Child from './child';
export default{
  components: {Child},
  data: function () {
    return {
      c: 0,
      a: 3,
      parentMsg: 'Message from parent ',
      messages: []
    };
  },
  methods: {
    handleMessage: function (payload) {
      this.messages.push(payload.message);
    }
  }
};
</script>
<style>
#hello{
  background: aqua;
}
</style>
