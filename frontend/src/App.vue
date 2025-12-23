<script  lang="ts" setup>
  import axios from 'axios';
  import LoginFrm from './components/LoginFrm.vue';
  import toaster from './components/toaster.vue';
  // import {defineComponent} from 'vue';
  let token = localStorage.getItem('token');
  
  axios.defaults.baseURL = 'http://localhost:7000/api';
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }else{
    axios.defaults.headers.common['Authorization'] = '';
  }

</script>

<template>
  <toaster></toaster>
  <LoginFrm></LoginFrm>
</template>

<style scoped>

</style>
