<template>
    <div>
        <h2>Match Details</h2>
        {{$route.params}}
        {{match_id}}
    </div>

</template>

<script>
    import 'whatwg-fetch';
    import dotaconstants from   'dotaconstants';

    export default {
        name: "MatchDetail",
        data(){
            return{
                match_id:this.$route.params.match_id
            }
        },
        props:[],
        created:function(){
            //console.log('==created==\n',this.match_id);
        },
        beforeMount:function(){
          console.log("===beforeMount===\n",this.match_id);
          this.getMatchDetail();
        },
        mounted:function(){
            //console.log("===mounted===\n",this.match_id);
        },
        methods:{
            getMatchDetail:function () {
                console.log('get match detail>>');
                let match_id=parseInt(this.match_id);
                console.log(match_id);
                fetch('/api/player/getonematchdetail/'+match_id,{
                    method:'GET'
                }).then((res)=>{
                    console.log(res);
                    return res.json();
                }).then((data)=>{
                    console.log(data);
                });
            }
        }
    }
</script>

<style scoped>

</style>
