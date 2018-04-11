<template>
    <div class="parent_section">
        PARENT COMPONENT:
        <br/>
        router?{{$route.params}}
        <input v-model="parentMsg">
        <br/>
        <!--parent data=="parentMsg"-->
        <child v-bind:message="parentMsg" v-bind="parentObj"></child>

        {{fullName}}
    </div>

</template>

<script>
import Child from './child';

    export default {
        components: {Child},
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
        }
    }
</script>

<style scoped>
.parent_section{
    border: 1px solid;

}
</style>
