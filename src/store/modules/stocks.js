import stocks from '../../data/stocks';

const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },

    'RND_STOCKS'(state) {
        state.stocks.forEach(stock => {
            let rand = 1 + Math.random() - 0.5;
            if (rand > 1.0) {
                stock.price = stock.price * rand;
            } else {
                stock.price = stock.price / (2 - rand);
            }
        });
    }
}

const actions = {
    buyStock: ({ commit }, order) => {
        commit('BUY_STOCK', order);
    },

    initStocks: ({ commit }) => {
        commit('SET_STOCKS', stocks);
    },

    randomizeStocks: ({ commit }) => {
        commit('RND_STOCKS', stocks);
    }
}

const getters = {
    stocks: state => {
        return state.stocks;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}