import Home from './components/Home.vue';
import Stocks from './components/Stock/Stocks.vue';
import Portfolio from './components/Portfolio/Portfolio.vue';
import SignIn from './components/sign-in-up/SignIn.vue';
import SignUp from './components/sign-in-up/SignUp.vue';
import PriceVar from './components/PriceVar/PriceVar.vue'
import session from './store/modules/session';
import VueRouter from 'vue-router';

const routes = [
    { path: '/sign-in', component: SignIn, name: "SignIn" },
    { path: '/sign-up', component: SignUp, name: "SignUp" },
    { path: '', component: Home, name: 'Home', meta: { requiresAuth: true } },
    { path: '/stock', component: Stocks, name: "StockPage", meta: { requiresAuth: true } },
    { path: '/portfolio', component: Portfolio, name: "Portfolio", meta: { requiresAuth: true } },
    { path: '/price-var', component: PriceVar, name: "PriceVar", meta: { requiresAuth: true } }
]

const router = new VueRouter({ mode: 'history', routes })

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (session.state.idToken) {
            next()
            return
        }
        next('/sign-in')
    } else {
        next()
    }
})

export default router;