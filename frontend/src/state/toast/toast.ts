import { defineStore } from 'pinia';

export const toaster = defineStore("toast", {
  state: () => ({
    code: 0,
    message: '',
    type: '',
    show: false
  }),
  actions:{
    trigger(message: string, code: number){
        this.code = code;
        this.message = message;
        this.show = true;

        switch(this.code){
            case 400:
                this.type = 'ข้อผิดพลาดไม่คาดฝัน'
                break;
            case 401:
                this.type = 'ยืนยันตัวตนไม่สำเร็จ'
                break;
            case 500:
                this.type = 'ข้อผิดพลาดภายใน server'
                break;
            case 200:
                this.type = 'success'
                break;
            default:
                this.type = 'ไม่ทราบ'
                break;
        }

        setTimeout(() =>{
            this.code = 0;
            this.show = false;
            this.type = '';
        }, 3000)
    }
  }
})