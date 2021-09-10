<template>
    <div class="ui active inverted dimmer"> 
       <div class="ui loader"> </div>
    </div>
</template>
<script>
export default {
    name: "loader"
}
</script>
<style>
     .ui.inverted.dimmer{
        background-color: rgb(255, 255, 255, 0) !important  ;
    }
</style>
