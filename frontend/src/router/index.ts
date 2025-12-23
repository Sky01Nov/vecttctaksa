import { createRouter, createWebHistory } from "vue-router";
import LoginFrm from "../components/LoginFrm.vue";
import Dashboard from "../components/Dashboard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/login', component: LoginFrm },
        { path: '/dashboard', component: Dashboard }
    ]
});

router.beforeEach((to, from, next)=>{
    from.path;
    let token = localStorage.getItem('token');
    if(!token && to.path != '/login'){
        next('/login');
    }else if (token && to.path === '/login') {
        next('/') 
    } else {
        next();
    }
});

export default router