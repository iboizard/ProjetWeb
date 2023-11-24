import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import Login from '../pages/Login.vue';
import Teams from '../pages/Teams.vue';
import Projects from '../pages/Projects.vue';
import Budget from '../pages/Budget.vue';
import SignUp from '../pages/SignUp.vue';
import Profil from '../pages/Profil.vue';
import Disconnect from '../pages/Disconnect.vue'

const router = createRouter({
    routes: [
        { path: '/', name: 'HomePage', component: HomePage },
        { path: '/login', name: 'Login', meta: { needNotLogged: true }, component: Login },
        { path: '/teams', name: 'Teams', meta: { needLogged: true }, component: Teams },
        { path: '/projects', name: 'Projects', meta: { needLogged: true }, component: Projects },
        { path: '/budget', name: 'Budget', meta: { needLogged: true }, component: Budget },
        { path: '/signUp', name: 'SignUp', meta: { needNotLogged: true }, component: SignUp },
        { path: '/profil', name: 'Profil', meta: { needNotLogged: true }, component: Profil },
        { path: '/disconnect', name: 'Disconnect', meta: { needNotLogged: true }, component: Disconnect },
        // if path not found, redirect to Home
        { path: '/:pathMatch(.*)*', redirect: '/' }, // If path not found, redirect to Home
    ],
    history: createWebHistory(),
});

// protect routes by checking token validity
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token');
    if (to.meta.needNotLogged && token) {
        next('/'); // Redirect to Home
    }
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('jwt_token');
        alert('Your session has expired. Please log in again.');
        next('/login'); // Redirect to login page
    } else {
        next(); // Proceed as normal
    }
});

// check if token is expired
function isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const now = Date.now() / 1000;
    return exp < now;
}

const token = localStorage.getItem('jwt_token');
if (token && isTokenExpired(token)) {
    userState.isAuthenticated = false;
    localStorage.removeItem('jwt_token');
}

export default router;