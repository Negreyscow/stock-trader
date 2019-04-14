import Home from './components/Home.vue';
import Stocks from './components/Stock/Stocks.vue';
import Portfolio from './components/Portfolio/Portfolio.vue';
import SignIn from './components/sign-in-up/SignIn.vue';
import SignUp from './components/sign-in-up/SignUp.vue';
import session from './store/modules/session';
import VueRouter from 'vue-router';

const routes = [

    { path: '/sign-in', component: SignIn, name: "SignIn" },
    { path: '/sign-up', component: SignUp, name: "SignUp" },
    {
        path: '', component: Home, name: 'Home', beforeEnter(to, from, next) {
            if (session.state.idToken) {
                next()
            } else {
                next('/sign-in')
            }
        }
    },
    { path: '/stock', component: Stocks, name: "StockPage" },
    { path: '/portfolio', component: Portfolio, name: "Portfolio" }
]

export default new VueRouter({ mode: 'history', routes })