const state = {
    order: "Ascending",
    selected: "",
    copyStock: [],
    stocks: []
};

const mutations = {
    orderStockPrice({ state, getters }, order) {
        const stockss = getters.stocks
    },
    orderStockValue(state, order) {
        state.stocks.sort(function (a, b) {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (order == "Ascending") {
                return x < y ? -1 : x > y ? 1 : 0;
            } else {
                return x > y ? -1 : x < y ? 1 : 0;
            }
        });
    },
    copyStocks(state, stocks) {
        state.copyStock = stocks.slice()
    }
};

const actions = {
    updateStocks({ dispatch }, data) {
        if (data.selected == "") {
            alert("You need to choose an order method!");
        } else {
            if (data.selected == "Price") {
                dispatch('orderPrice', data)
            } else {
                dispatch('orderName', data);
            }
        }
    },
    orderPrice({ commit }, data) {
        commit('orderStockPrice', data.stocks)
        data.stocks.sort(function (a, b) {
            if (data.order == "Ascending") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    },
    orderName({ state, commit }, order) {
        commit('orderStockValue', order);
    },
    copyStocks({ commit }, stocks) {
        commit('copyStocks', stocks)
    }
};

export default {
    state,
    mutations,
    actions
}