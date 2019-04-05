<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{ name: 'Home'}" style="margin-left: 100px">Stock Trader</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <router-link class="nav-link" tag="li" :to="{ name: 'Portfolio'}" activeClass="active">
          <a>Portfolio</a>
        </router-link>
        <router-link class="nav-link" :to="{ name: 'StockPage' }" activeClass="active" tag="li">
          <a>Stocks</a>
        </router-link>
      </ul>
    </div>
    <form class="form-inline" style="margin-right: 100px">
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <a class="nav-link" href="#" @click="endDay()">End Day</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Founds: {{ getFunds | currency}}</a>
        </li>
        <li class="nav-item dropdown">
          <div class="align-left">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Save & Load</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="saveData()" href="#">Save</a>
              <a class="dropdown-item" @click="loadData()" href="#">Load</a>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </nav>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isDropdownOpen: false
    };
  },
  computed: {
    getFunds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData"
    }),
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };
      this.$http.put("StockTraderSave.json", data);
    },

    loadData() {
      this.fetchData();
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
  margin: 0;
}

.align-left {
  float: right;
}
</style>
