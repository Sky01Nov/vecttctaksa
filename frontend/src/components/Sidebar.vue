<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const isActive = (path: string) => route.path === path ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700';
</script>

<template>
  <div class="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 flex flex-col shadow-lg">
    <div class="p-6 text-2xl font-bold border-b border-gray-700">
     ระบบประเมินบุคลากร
    </div>
    
    <nav class="flex-1 p-4 space-y-2">
      <router-link to="/dashboard" :class="['block p-3 rounded transition', isActive('/dashboard')]">
        Dashboard
      </router-link>
      
      <router-link to="/evaluate" :class="['block p-3 rounded transition', isActive('/evaluate')]">
        ประเมินพนักงาน
      </router-link>
      
      <router-link to="/history" :class="['block p-3 rounded transition', isActive('/history')]">
        ประวัติการประเมิน
      </router-link>
    </nav>

    <div class="p-4 border-t border-gray-700">
      <button @click="logout" class="w-full bg-red-500 hover:bg-red-600 p-2 rounded text-white transition">
        ออกจากระบบ
      </button>
    </div>
  </div>
</template>