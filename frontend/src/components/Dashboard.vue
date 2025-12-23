<script lang="ts" setup>
import { ref } from 'vue';

// Mock Data ไปก่อน เพื่อความเร็ว
const stats = ref([
  { title: 'พนักงานทั้งหมด', value: 120, color: 'bg-blue-500' },
  { title: 'ประเมินแล้ว', value: 85, color: 'bg-green-500' },
  { title: 'รอการประเมิน', value: 35, color: 'bg-orange-500' },
]);

const pendingList = ref([
  { id: 1, name: 'นาย สมชาย ใจดี', dep: 'IT Support', status: 'Pending' },
  { id: 2, name: 'น.ส. สมหญิง จริงใจ', dep: 'Marketing', status: 'Pending' },
  { id: 3, name: 'นาย เอกพล คนขยัน', dep: 'Sales', status: 'Pending' },
]);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard การประเมิน</h1>

    <div class="grid grid-cols-3 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.title" :class="['p-6 rounded-lg shadow-md text-white', stat.color]">
        <div class="text-lg">{{ stat.title }}</div>
        <div class="text-4xl font-bold mt-2">{{ stat.value }}</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4 border-b pb-2">รายชื่อที่ต้องประเมิน (3)</h2>
      
      <table class="w-full text-left">
        <thead>
          <tr class="text-gray-500 border-b">
            <th class="p-3">ชื่อ-นามสกุล</th>
            <th class="p-3">แผนก</th>
            <th class="p-3">สถานะ</th>
            <th class="p-3">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pendingList" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ user.name }}</td>
            <td class="p-3">{{ user.dep }}</td>
            <td class="p-3">
              <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                {{ user.status }}
              </span>
            </td>
            <td class="p-3">
              <button class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                เริ่มประเมิน
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>