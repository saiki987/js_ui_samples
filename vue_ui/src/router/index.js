import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import TodoBoard from "@/views/TodoBoard.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: '/todo_board',
        name: 'TodoBoard',
        component: TodoBoard,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
