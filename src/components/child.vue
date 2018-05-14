<template xmlns:v-on="http://www.w3.org/1999/xhtml">
<div class="child_section">
    {{child_messge}}


  <span>props.message:   {{message}}</span><br/>

<span>props>name            {{parentObj.name}}</span><br/>
    <span>props>age          {{parentObj.age}}</span>
    <!--向父组件-->1
    <input v-model="sizeToSend">
<button v-on:click="$emit('enlarge-text',0.2)">enlarge-text</button>
</div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
        child_messge:'CHILD COMPONENT',
        sizeToSend:0
    };
  },
    /*声明props*/
    props:[
        'message',
        "parentObj"
    ],
    created:function () {
        console.log('chjild component created');
    }

};
</script>

<style scoped>
    .child_section{
        border: #eed221 1px solid;
        margin: 1em;
    }
</style>
