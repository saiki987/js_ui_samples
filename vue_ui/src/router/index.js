import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import TodoBoard from "@/views/TodoBoard.vue"
import Gomoku from "@/views/Gomoku.vue"
import LayoutEditor from "@/views/LayoutEditor.vue"

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
    },
    {
        path: '/gomoku',
        name: 'Gomoku',
        component: Gomoku,
    },
    {
        path: '/layout_editor',
        name: 'LayoutEditor',
        component: LayoutEditor,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
