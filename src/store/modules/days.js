import stocks from "../../data/stocks";
import globalAxios from 'axios';

const state = {
    day: 1,
    days: [],
    companies: [],
    companyData: [],
    companiesData: []
};

const mutations = {
    incDay(state) {
        state.day += 1;
    },
    saveDay(state, payload) {
        state.days.push(payload)
    },
    saveCompanies(state) {
        state.companies = stocks
    },
    saveCompanyData(state, payload) {
        state.companyData = payload
    }
}

const actions = {

    async companiesData({ commit, rootState, state, dispatch }, companies) {
        let maps = []
        companies.forEach(async company => {
            globalAxios.get("/users.json" + "?auth=" + rootState.session.idToken)
                .then(async res => {
                    const users = res.data
                    for (let key in users) {
                        if (users[key].userId == rootState.session.uid) {
                            globalAxios.get("/users/" + key + "/days.json" + "?auth=" + rootState.session.idToken)
                                .then(async res => {
                                    const days = res.data
                                    for (let day in days) {
                                        for (let i = 0; i < days[day].length; i++) {
                                            if (maps[i] == null) {
                                                maps.push(days[day][i].name)
                                            } else {
                                                if (map.get(days[day][i].name).length == 1) {
                                                    aux.push(map.get(days[day][i].name))
                                                } else {
                                                    aux = map.get(days[day][i].name)
                                                }
                                                aux.push(days[day][i].price)
                                                map.set(days[day][i].name, aux)
                                            }
                                        }
                                    }
                                }).catch(e => console.log(e))
                            console.log(map)
                        }
                    }

                }).catch(e => console.log(e))
        });
    },

    async companyData({ commit, rootState }, companyName) {
        globalAxios.get("/users.json" + "?auth=" + rootState.session.idToken)
            .then(async res => {
                const users = res.data
                for (let key in users) {
                    if (users[key].userId == rootState.session.uid) {
                        globalAxios.get("/users/" + key + "/days.json" + "?auth=" + rootState.session.idToken)
                            .then(async res => {
                                const days = res.data
                                let infoCompany = []
                                for (let day in days) {
                                    for (let i = 0; i < days[day].length; i++) {
                                        if (days[day][i].name == companyName) {
                                            infoCompany.push(days[day][i].price)
                                        }
                                    }
                                }
                                commit('saveCompanyData', infoCompany)
                            }).catch(e => console.log(e))
                    }
                }

            }).catch(e => console.log(e))
    },

    saveCompanies({ commit }) {
        commit('saveCompanies')
    },

    nextDay({ commit, rootState }) {
        commit('incDay')
    },
    saveDay({ state, rootState }, data) {
        globalAxios.get("/users.json" + "?auth=" + rootState.session.idToken)
            .then(res => {
                const users = res.data;
                if (users != null) {
                    for (let key in users) {
                        if (users[key].userId == rootState.session.uid) {
                            globalAxios.post("/users/" + key + "/days.json" + "?auth=" + rootState.session.idToken, data)
                                .then(res => console.log(res))
                                .catch(err => console.log(err));
                        }
                    }
                }
            }).catch(e => console.log(e));
    }

}

const getters = {
    getDay(state) {
        return state.day
    },
    getDays(state) {
        return state.days
    },
    getCompanies(state) {
        return state.companies
    },
    getCompanyData(state) {
        return state.companyData
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
