<template>
<div>
  CHILD COMPONENT:
  <span></span>

  <input type="text" v-model="message"/>
  <button v-on:click="handleSendMessage">send</button>
</div>
</template>

<script>
export default {
  name: 'child',
  data: function () {
    return {
      // myMessage: ,
      message: 'test message'
    };
  },
  methods: {
    handleSendMessage: function () {
      this.$emit('message', {message: this.message});
    }
  }
};
</script>

<style scoped>

</style>
