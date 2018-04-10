<template>
<div class="child_section">
    {{child_messge}}
  <span>{{message}}</span>

<span>{{name}}</span>
    <span>{{age}}</span>

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
    props:['message','name','age',"parentObj"]

};
</script>

<style scoped>
    .child_section{
        border: #eed221 1px solid;
        margin: 1em;
    }
</style>
