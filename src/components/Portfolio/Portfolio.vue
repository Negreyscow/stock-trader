<template>
  <div class="row flex-fill d-flex justify-content-center">
    <div class="d-flex justify-content-center" style="margin: 10px">
      <select v-model="selected" class="custom-select">
        <option disabled value>Order by</option>
        <option>Price</option>
        <option>Name</option>
      </select>
      <select v-model="order" class="custom-select">
        <option disabled value>Order by</option>
        <option>Descending</option>
        <option>Ascending</option>
      </select>
      <button class="btn btn-outline-secondary" @click="updateItems">Apply</button>
    </div>
    <transition-group class="row d-flex justify-content-center" name="list-complete" tag="div">
      <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id" class="list-complete-item"></app-stock>
    </transition-group>
  </div>
</template>

<script>
import { orderStocksMixin } from "../utils/orderFunctions.js";
import Stock from "./Stock.vue";
export default {
  data() {
    return {
      stockSort: []
    };
  },
  mixins: [orderStocksMixin],
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    }
  },
  components: {
    appStock: Stock
  }
};
</script>

<style>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
