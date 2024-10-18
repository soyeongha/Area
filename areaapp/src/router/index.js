import { createRouter, createWebHistory } from "vue-router";

//연결할 각 컴포넌트 import
import AreaHome from '@/views/AreaHome.vue'
import AreaTable from "@/views/AreaTable.vue";
import UseArea from "@/views/UseArea.vue";
import AreaSchedule from "@/views/AreaSchedule.vue";
import MonthSchedule from '@/views/MonthSchedule.vue';

//라우터 설계
const routes = [
    {path: '/', component: AreaHome },
    {path: '/AreaTable', component: AreaTable},
    {path: '/UseArea', component: UseArea},
    { path: '/schedule/:month', name: 'AreaSchedule', component: AreaSchedule }, // 라우트 설정
   { path: '/schedule/:month', component: MonthSchedule } // 동적 라우팅 설정
]

//라우터 생성
const router = createRouter({
    history:createWebHistory(),
    routes
});

export {router}