<template>
   <div class="home mt-5"> 
       <div class="container">           
           <div class="row justify-content-center">
               <div class="col-md-7">  
              <form @submit="submitForm">
                <table class="table">
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">First Name</label></td> 
                    <td> <input type="text" id="first Name" class="form-control" v-model="form.firstname" placeholder="first Name" name="fname" value="form.firstname"></td>
                    </tr>
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">Last Name</label></td> 
                    <td> <input type="text" id="last Name" class="form-control" v-model="form.lastname" placeholder="last Name" name="lname" value="form.lastname"></td>
                    </tr>
                    <tr> <td><label for="disabledTextInput" class="form-label mr-5">Email</label></td> 
                    <td> <input type="text" id="email" class="form-control" v-model="form.email" placeholder="email" name="email" value="form.email"></td>
                    </tr>
                </table> 
                <div class="text-center"><button type="submit" :class="{ 'btn-warning': isEdit, 'btn-success': !isEdit}">{{data}}</button></div>
                </form>
               </div>
               
           </div>
        </div>
        <loader v-if="loader"/>
        <CustomerList :list="list" @onDelete="onDelete" @onEdit="onEdit"></CustomerList>
        
    </div>
</template>

<script>
import Vue from'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import CustomerList from './CustomerList.vue'
import loader from './loader.vue'
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
            data:"Submit",
            loader:false
        }
    },
    components:{
       CustomerList,
       loader
    }, 
    methods:{
        
        getCustomers(){
            this.loader=true;
            axios.get('http://localhost:3000/users').then(response=>{
            this.list=response.data;
            
            this.loader=false;
        })
        },
        submitForm(e){
             e.preventDefault();   
            if(this.formValidation()){
                if(this.isEdit){
              
                axios.put('http://localhost:3000/users/'+this.form.id, this.form).then(response=>{
                this.getCustomers();
                this.isEdit=false;
                this.data="Submit"
            })
            }else{
               
                axios.post('http://localhost:3000/users', this.form).then(response=>{
                this.getCustomers();
                
            })
            }
            this.clearFormFields();
            }
         
           
            
        },
        formValidation(){
            if(document.getElementsByName("fname")[0].value ===""){
                alert("enter first name");
                return false;
            }
            if(document.getElementsByName("lname")[0].value ===""){
                alert("enter last name");
                return false;
            }
            if(document.getElementsByName("fname")[0].value ===""){
                alert("enter email");
                return false;
            }
            return true

        },
        clearFormFields(){
            this.form.firstname="";
            this.form.lastname="";
            this.form.email="";
        },
        onDelete(id){
            this.loader=true;
            axios.delete('http://localhost:3000/users/'+id).then(response=>{
            this.getCustomers();
            })
            
            
        },
        onEdit(data){
            this.data="Update";
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
    }.btn-warning{
        padding:0 10px;
        font-size: 25px;
        border-radius: 5px;
    }
    .btn-success{
        padding:0 10px;
        font-size: 25px;
        border-radius: 5px;
    }
   

</style>