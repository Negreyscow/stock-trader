import axios from '../../axios_auth';
import globalAxios from 'axios';
import router from '../../routes';

const state = {
    idToken: null,
    userId: null,
    user: null,
    username: null
};

const mutations = {
    authUser(state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUser(state, user) {
        state.user = user;
    },
    logout(state, user) {
        state.idToken = null;
        state.userId = null;
        state.user = null;
    },
    storeUsername(state, name) {
        state.username = name
    }

};

const actions = {
    getUsername({ commit, state }, uid) {
        globalAxios.get('/users.json' + "?auth=" + state.idToken).then(res => {
            const data = res.data
            for (let key in data) {
                if (data[key].userId == uid) {
                    commit('storeUsername', data[key].username)
                    debugger;
                }
            }
        })
    },
    updateDatabase() {
        const save = {
            userId: this.$store.getters.getUserId,
            funds: this.$store.getters.funds,
            stockPortfolio: this.$store.getters.stockPortfolio,
            stocks: this.$store.getters.stocks
        };
        globalAxios
            .get("/users.json" + "?auth=" + this.getTokenId())
            .then(res => {
                const data = res.data;
                for (let key in data) {
                    if (data[key].userId == localStorage.idUser) {
                        globalAxios
                            .post("stockData.json" + "?auth=" + this.getTokenId(), save)
                            .then(res => console.log(res))
                            .catch(err => console.log(err));
                        console.log(data[key].email);
                        console.log(key);
                    }
                }
            });
    },
    setLogOutTimer({ commit }, expirationTime) {
        setTimeout(() => {
            commit('logout')
        }, expirationTime * 1000)
    },

    logout({ commit }) {
        commit('logout');
        router.push({ name: 'SignIn' })
    },
    signup({ commit, dispatch }, formData) {
        axios.post("/signupNewUser?key=AIzaSyBIE5taNlOVotDf3PwAXroOTj2DrnbUw_E",
            {
                email: formData.email,
                password: formData.password,
                returnSecureToken: true
            }
        )
            .then(response => {
                localStorage.setItem('uid', response.data.localId)
                console.log(response)
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                formData.userId = localStorage.uid;
                dispatch('storeUser', formData);
                router.replace({ name: 'SignIn' });
            })
            .catch(err => console.log(err));
    },

    login({ commit, dispatch }, formData) {
        axios.post("/verifyPassword?key=AIzaSyBIE5taNlOVotDf3PwAXroOTj2DrnbUw_E",
            {
                email: formData.email,
                password: formData.password,
                returnSecureToken: true
            }
        )
            .then(response => {
                console.log(response.data)
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId,
                    username: response.data.username
                })
                localStorage.setItem('uid', response.data.localId)
                dispatch('getUsername', localStorage.uid);
                router.replace({ name: 'Home' });
            })
            .catch(err => console.log(err));
    },
    storeUser({ commit, state }, userData) {
        if (!state.idToken) {
            return;
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    },
    fetchUser({ commit, state }) {
        if (!state.idToken) {
            return;
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                const data = res.data;
                const users = [];
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                }
                commit('storeUser', users[0]);
            })
            .catch(err => console.log(err));
    },

    saveChanges() {

    }
};


const getters = {
    user(state) {
        return state.user;
    },

    isAuthenticated(state) {
        return state.userId != null;
    },

    getUserId(state) {
        return state.userId;
    },

    getIdToken(state) {
        return state.idToken
    },
    getUsername(state) {
        return state.username;
    }

};

export default {
    state,
    mutations,
    actions,
    getters
};