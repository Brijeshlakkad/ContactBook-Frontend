import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: "index",
            component: Login
        },
        {
            path: '/login',
            name: "login",
            component: Login,
            props: true
        },
        {
            path: '/register',
            name: "register",
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            props: true
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = (localStorage.getItem('user') != null);
    console.log("LoggedIn: " + loggedIn + " & Auth: " + authRequired);
    if (!authRequired && loggedIn) {
        return next('/home');
    }
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});
export default router;