import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { name:'test', path: '/test', component:() => import('./pages/test/index.vue')}
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
    
})
export default router