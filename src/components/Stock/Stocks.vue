<template>
  <div class="row d-flex flex-fill justify-content-center">
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
  mixins: [orderStocksMixin],
  computed: {
    stocks() {
      console.log(this.$store.getters.stocks);
      return this.$store.getters.stocks;
    }
  },
  components: {
    appStock: Stock
  }
};
</script>

<style>
.list-complete-move {
  transition: transform 1s;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
