import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
// import Login from '../pages/Login.vue';
// import Teams from '../pages/Teams.vue';
// import Projects from '../pages/Projects.vue';
// import Budget from '../pages/Budget.vue';

export const router = createRouter({
    routes: [
        { path: '/', name: 'HomePage', component: HomePage },
        // { path: '/login', name: 'Login', meta: { needNotLogged: true }, component: Login },
        // { path: '/teams', name: 'Teams', meta: { needLogged: true }, component: Teams },
        // { path: '/projects', name: 'Projects', meta: { needLogged: true }, component: Projects },
        // { path: '/budget', name: 'Budget', meta: { needLogged: true }, component: Budget },
        // if path not found, redirect to Home
        { path: '/:pathMatch(.*)*', redirect: '/' }, // If path not found, redirect to Home
    ],
    history: createWebHistory(),
});
