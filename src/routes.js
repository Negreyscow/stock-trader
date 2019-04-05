import Home from './components/Home.vue';
import Stocks from './components/Stock/Stocks.vue';
import Portfolio from './components/Portfolio/Portfolio.vue';

export const routes = [
    { path: '', component: Home, name: 'Home' },
    { path: '/stock', component: Stocks, name: "StockPage" },
    { path: '/portfolio', component: Portfolio, name: "Portfolio" }
]