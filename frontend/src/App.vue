<script  lang="ts" setup>
  import axios from 'axios';
  import toaster from './components/toaster.vue';
  import Sidebar from './components/Sidebar.vue'; // import เข้ามา
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
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
  <!-- <LoginFrm></LoginFrm> -->
   <div class="flex">
    <Sidebar v-if="route.path !== '/login'" />

    <div :class="route.path !== '/login' ? 'ml-64 w-full p-8 bg-gray-50 min-h-screen' : 'w-full'">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
