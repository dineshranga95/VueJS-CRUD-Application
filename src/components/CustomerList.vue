<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <table class="table table-bordered">
                    
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <td></td>
                <td></td>
            </tr>
            
        </thead>
        <tbody>
            <tr v-for="customers in list" :key="customers.id">
                <td>{{customers.id}}</td>
                <td>{{customers.firstname}}  {{customers.lastname}}</td>
                <td>{{customers.email}}</td>
                <td class="text-center"><button class="btn btn-warning" v-on:click="EditCustomer(customers)">EDIT</button></td>
                <td class="text-center"><button class="btn btn-danger" v-on:click="DeleteCustomer(customers.id)">DELETE</button></td>
            </tr>
        </tbody>
        </table>
            </div>
        </div>
        
    </div> 
</template>

<script>

export default {
     name : "CustomerList",
     data(){
         return{
            
         }
     },props:[
         'list'
     ],
    components:{
        
    },
   
    methods:{
       
        DeleteCustomer(id){        
            this.$emit('onDelete',id)      
        },
        EditCustomer(data){
            this.$emit('onEdit',data)
           
        }
    }
    
}
</script>