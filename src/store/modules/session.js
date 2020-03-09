import axios from '../../axios_auth';
import globalAxios from 'axios';
import router from '../../routes';

const state = {
    idToken: null,
    userId: null,
    user: null,
    uid: null,
    username: null,
    email: null,
    password: null,
    verifyPassword: null
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
    storeUser(state, data) {
        state.username = data.username,
            state.email = data.email,
            state.password = data.password,
            state.verifyPassword = data.confirmPassword
    },
    setUid(state, value) {
        state.uid = value
    },
    setUserList(state, value) {
        usersList = value;
    }

};

const actions = {
    storeUserInfo({ commit, state }) {
        globalAxios.get('/users.json' + "?auth=" + state.idToken).then(res => {
            const data = res.data
            for (let key in data) {
                if (data[key].userId == state.uid) {
                    commit('storeUser', data[key])
                    commit('SET_PORTFOLIO', data[key].portfolio)
                    commit('SET_STOCKS', data[key].stocks)
                }
            }
        }).catch(e => console.log(e))
    },
    updateDatabase({ commit, state }, save) {
        globalAxios
            .get("/users.json" + "?auth=" + state.idToken)
            .then(res => {
                const users = res.data;
                if (users != null) {
                    for (let key in users) {
                        if (users[key].userId == state.uid) {
                            globalAxios
                                .put("/users/" + key + '.json' + "?auth=" + state.idToken, save)
                                .then(res => console.log(res))
                                .catch(err => console.log(err));
                            console.log('atualizou user')
                        }
                    }
                } else {
                    globalAxios
                        .post("/stockData.json" + "?auth=" + state.idToken, save)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));
                    console.log('cria um novo')
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
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                formData.userId = localStorage.uid;
                dispatch('storeUser', formData);
                router.replace({ name: 'Home' });
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
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId,
                })
                localStorage.setItem('uid', response.data.localId)
                commit('setUid', localStorage.uid)
                dispatch('storeUserInfo')
                dispatch('saveCompanies')
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
    },
    getUid(state) {
        return state.uid;
    },
    username(state) {
        return state.username;
    },
    password(state) {
        return state.password
    },
    verifyPassword(state) {
        return state.verifyPassword
    },
    email(state) {
        return state.email
    }

};

export default {
    state,
    mutations,
    actions,
    getters
};