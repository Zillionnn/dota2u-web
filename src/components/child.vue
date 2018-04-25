<template>
<div class="child_section">
    {{child_messge}}


  <span>props .message:{{message}}</span><br/>

<span>props>name            {{name}}</span><br/>
    <span>props>age          {{age}}</span>

</div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
        child_messge:'CHILD COMPONENT'
    };
  },
    /*声明props*/
    props:['message',

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
