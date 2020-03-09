import stocks from '../../data/stocks';
import axios from '../../axios_stockAPI'

const state = {
    stocks: []
};

//this.$store.commit();
const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },
    'SET_STOCKS_INIT'(state, stocks) {
        for (let key in stocks) {
            axios.get(stocks[key].name + '/quote?token=sk_378b385403614f289c232b7fbbd6c241')
                .then(res => {
                    let resposta = 0
                    if (res.data) {
                        resposta = res.data.iexRealtimePrice;
                    }
                    console.log(resposta);
                    stocks[key].price = parseInt(resposta)
                })
                .catch(e => console.log(e));
        }
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

//this.$store.dispatch(function, data)
const actions = {
    buyStock: ({ commit }, order) => {
        commit('BUY_STOCK', order);
    },

    initStocks: ({ commit }) => {
        commit('SET_STOCKS_INIT', stocks);
    },

    randomizeStocks: ({ commit, dispatch }) => {
        commit('RND_STOCKS', stocks);
        dispatch('saveDay', state.stocks)
        dispatch('nextDay')
    }
}

//this.$store.getters.stocks
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