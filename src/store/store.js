import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import session from './modules/session';
import days from './modules/days'
import orderStocks from './modules/orderStocks';
import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio,
        session,
        orderStocks,
        days
    }
});

