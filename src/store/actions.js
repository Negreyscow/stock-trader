import Vue from 'vue';
import globalAxios from 'axios';
import store from './store'

export const loadData = ({ commit, getters, state }) => {
    globalAxios.get("/users.json" + "?auth=" + getters.getIdToken)
        .then(response => {
            if (response.data) {

                const usersList = response.data

                //const stocks = response.data.stocks;
                //const funds = response.data.funds;
                //const stockPortfolio = response.data.stockPortfolio;


                //const portfolio = {
                //    stockPortfolio,
                //    funds
                //};

                //commit('SET_STOCKS', stocks);
                //commit('SET_PORTFOLIO', portfolio);


            }
        }).catch(err => console.log(err))
}    