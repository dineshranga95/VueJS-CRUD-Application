<template>
   <div class="home mt-5"> 
       <div class="container">           
           <div class="row justify-content-center">
               <div class="col-md-7">  
              <form @submit="submitForm">
                <table class="table">
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">First Name</label></td> 
                    <td> <input type="text" id="first Name" class="form-control" v-model="form.firstname" placeholder="first Name" value="form.firstname"></td>
                    </tr>
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">Last Name</label></td> 
                    <td> <input type="text" id="last Name" class="form-control" v-model="form.lastname" placeholder="last Name" value="form.lastname"></td>
                    </tr>
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">Email</label></td> 
                    <td> <input type="text" id="email" class="form-control" v-model="form.email" placeholder="email" value="form.email"></td>
                    </tr>
                </table> 
                <div class="text-center"><button type="submit" class="btn btn-primary">Submit</button></div>
                </form>
               </div>
               
           </div>
        </div>
        <CustomerList :list="list" @onDelete="onDelete" @onEdit="onEdit"></CustomerList>
    </div>
</template>

<script>
import Vue from'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import CustomerList from './CustomerList.vue'

export default {
    name : "Home",
    data(){
        return{
            form:{
                firstname: null,
                lastname: null,
                email: null,
           
            },
            list:undefined,
            isEdit:false,
        }
    },
    components:{
       CustomerList
    }, 
    methods:{
        getCustomers(){
            axios.get('http://localhost:3000/users').then(response=>{
            this.list=response.data;
        })
        },
        submitForm(){
            if(this.isEdit){
                axios.put('http://localhost:3000/users/'+this.form.id, this.form).then(response=>{
                this.getCustomers();
            })
            }else{
                axios.post('http://localhost:3000/users', this.form).then(response=>{
                this.getCustomers();
            })
            }
            
        },
        onDelete(id){
            axios.delete('http://localhost:3000/users/'+id).then(response=>{
            this.getCustomers();
            })
            
        },
        onEdit(data){
            this.isEdit=true;
            this.form=data;
            this.submitForm();
        }
        
        
    },
        mounted(){
           this.getCustomers();
        }
}
</script>

<style scoped>
    .container{
        margin: auto;
    }

</style>