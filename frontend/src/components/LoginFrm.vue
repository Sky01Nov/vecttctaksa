<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { toaster } from '../state/toast/toast'


export default defineComponent({
    data() {
        return {
            LgnFrm:{
                usrnam: '',
                usrpwd: ''
            }
        }
    },
    setup(){
        const toast = toaster()
        return { 
            toast 
        };
    },
    methods: {
        onLogin(){
            // console.log(this.LgnFrm.usrnam)
            // console.log(this.LgnFrm.usrpwd)
            let body = {
                email: this.LgnFrm.usrnam,
                password: this.LgnFrm.usrpwd
            }

           axios.post('/auth/login', body).then(result => {
                    console.log('ข้อมูลที่ได้:', result.data);
                    console.log('สถานะ:', result.status);

                    this.toast.trigger(result.data.message, result.status);
                    
                    if (result.status === 200) {
                        const token = result.data.token;
                        
                        localStorage.setItem('token', token);

                        // alert('ล็อกอินสำเร็จ!');
                    } 
                })
                .catch(error => {
                    if (error.response) {
                        // this.toast.trigger(error.data.message, error.status);
                        this.toast.trigger(error.response.data.message, error.response.status);
                        console.log('Error Data:', error.response.data);
                        console.log('Error Status:', error.response.status);
                    }
                })
                .finally(() => {
                    // ปิดตัวโหลด (Loading spinner)
                });
            }
    },
    mounted() {
        
    },
})
</script>

<template>
    <div>
        <div class="flex min-h-screen justify-center items-center bg-black/10">
            <div class="flex w-100  flex-col bg-white rounded-2xl shadow-2xl">
                <div class="flex flex-row m-3 items-center gap-4">
                    <img src="https://rms.technictrang.ac.th/files/84393_21040610102633.png" alt="" srcset="" class="w-20 h-20">
                    <div class="flex flex-col justify-center">
                        <div class="font-bold">ล็อกอิน | Login</div>
                        <div class="opacity-50">ระบบ ประเมิณบุคลากร</div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 items-center w-full p-6">
                    <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="ชื่อผู้ใช้" required v-model="LgnFrm.usrnam">
                    <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="รหัสผ่าน" required v-model="LgnFrm.usrpwd">
                        <div class="w-full flex justify-end">
                            <button class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out" @click="onLogin()">
                                Login
                            </button>
                        </div>
                </div>
                <!-- <hr class="w-full border border-2 rounded-2xl"> -->
            </div>
        </div>
    </div>
</template>

<style>

</style>