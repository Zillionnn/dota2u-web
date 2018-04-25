<template>
    <div class="parent_section">
        PARENT COMPONENT:
        <br/>
        router?{{$route.params}}
        <input v-model="parentMsg">
        <br/>
        <!--parent data=="parentMsg"-->
       <!-- <child v-bind:message="parentMsg" v-bind="parentObj"></child>-->


        {{fullName}}

        <router-view></router-view>
    </div>

</template>

<script>
//import Child from './child';

    export default {
        //components: {Child},
        name: "Parent",
        data(){
            return{
                parentMsg:'parent message',
                parentObj:{
                    name:'jack',
                    age:16
                },
                firstName: 'Foo',
                lastName: 'Bar'
            }
        },
        computed: {
            fullName: function () {
               // console.log("full name");
                return this.firstName + ' ' + this.lastName
            }
        },
        created:function () {
            console.log("Parent.vue>>\n",this);
            this.count();
        },
        methods:{
            count:function () {
                console.log(this.$store);
                console.log(this.$store.state.count);
                  //  return store.state.count

            }
        }
    }
</script>

<style scoped>
.parent_section{
    border: 1px solid;

}
</style>
