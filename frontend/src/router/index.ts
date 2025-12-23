import { createRouter, createWebHistory } from "vue-router";
import LoginFrm from "../components/LoginFrm.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/login', component: LoginFrm },
        // { path: '/dashboard', component: Lo }
    ]
})

router.beforeEach((to, from, next)=>{
    let token = localStorage.getItem('token');
    if(!token && to.path != '/login'){
        next('/login');
    }else{
        next('');
    }
});

export default router