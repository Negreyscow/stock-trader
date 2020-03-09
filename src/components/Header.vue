<template>
  <nav class="navbar navbar-expand-lg nav-color">
    <router-link class="navbar-brand" :to="{ name: 'Home'}" style="margin-left: 50px">Stock Trader</router-link>
    <div class="center-col">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
        <img src="https://img.icons8.com/ios/28/000000/menu.png">
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link
          class="nav-item"
          tag="li"
          :to="{ name: 'Portfolio'}"
          activeClass="active"
          v-if="isAuthorized()"
        >
          <a class="nav-link">Portfolio</a>
        </router-link>
        <router-link
          class="nav-item"
          v-if="isAuthorized()"
          :to="{ name: 'StockPage' }"
          activeClass="active"
          tag="li"
        >
          <a class="nav-link">Stocks</a>
        </router-link>
        <router-link
          class="nav-item"
          v-if="isAuthorized()"
          :to="{ name: 'PriceVar' }"
          activeClass="active"
          tag="li"
        >
          <a class="nav-link">Price Variation</a>
        </router-link>
      </ul>
      <ul class="navbar-nav navbar-right" style="margin-right: 50px">
        <li class="nav-item" v-if="isAuthorized()">
          <a class="nav-link" href="#">
            <strong>Founds: {{ getFunds | currency}}</strong>
          </a>
        </li>
        <li class="nav-item" v-if="isAuthorized()">
          <a class="nav-link" href="#" @click="justSync()">
            <img src="https://img.icons8.com/wired/20/000000/upload-to-cloud.png" alt="Sync">
          </a>
        </li>
        <li class="nav-item" v-if="isAuthorized()">
          <h6 class="nav-link" style="padding: 0; margin-top: 10px">Day {{ nowDay() }}</h6>
        </li>
        <li class="nav-item" v-if="isAuthorized()">
          <a class="nav-link" href="#" @click="endDay()">
            <img src="https://img.icons8.com/ios/20/000000/end-filled.png">
          </a>
        </li>
        <li class="nav-item log-out" v-if="isAuthorized()">
          <a class="nav-link" href="#" @click="logOut()">
            <img src="https://img.icons8.com/ios/15/000000/exit.png">
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import globalAxios from "axios";
export default {
  data() {
    return {
      isDropdownOpen: false
    };
  },
  created() {
    this.$store.dispatch("fetchUser");
  },
  computed: {
    getFunds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      logout: "logout",
      sync: "updateDatabase"
    }),
    ...mapGetters({
      getId: "getUserId",
      isAuth: "isAuthenticated",
      getTokenId: "getIdToken",
      getDay: "getDay"
    }),
    endDay() {
      this.randomizeStocks();
    },
    justSync() {
      const portfolio = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio
      };
      const save = {
        username: this.$store.getters.username,
        email: this.$store.getters.email,
        password: this.$store.getters.password,
        confirmPassword: this.$store.getters.verifyPassword,
        userId: this.$store.getters.getUid,
        portfolio: portfolio,
        stocks: this.$store.getters.stocks
      };
      debugger;
      this.sync(save);
    },
    nowDay() {
      return this.getDay();
    },
    isAuthorized() {
      return this.isAuth();
    },
    logOut() {
      this.logout();
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: inherit;
  color: inherit;
}
.center-col {
  float: none;
  width: auto;
  margin: 0;
}

.center-responsive-menu {
  margin: auto;
  width: auto;
}

.align-left {
  float: right;
}
.nav-color {
  background-image: linear-gradient(to right, #a8ffdf, #6bfffc);
}
.color-t {
  border: 3px solid aliceblue;
}
</style>
