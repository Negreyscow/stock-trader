<template>
  <div style="width: 100%">

    <div class="row d-flex" style="justify-content: center">
        <select v-model="selected" class="custom-select" style="width: 200px">
          <option disabled value>Order by</option>
          <option>Price</option>
          <option>Name</option>
        </select>

        <button v-if="order == 'Ascending'" type="button" class="btn btn-default" @click="ordering">
          <span> <i class="fa fa-caret-down" aria-hidden="true"></i> </span>
        </button>

        <button v-else type="button" class="btn btn-default" @click="ordering">
          <span> <i class="fa fa-caret-up" aria-hidden="true"></i> </span>
        </button>

        <!-- <select v-model="order" class="custom-select" style="width: 200px">
          <option disabled value>Order by</option>
          <option>Descending</option>
          <option>Ascending</option>
        </select> -->
        <!-- <button class="btn btn-outline-secondary" @click="updateItems" style="width: 200px">
          Apply
        </button> -->
    </div>

    <div class="row d-flex" style="justify-content: center">
      <transition-group class="row d-flex justify-content-center" name="list-complete" tag="div">
        <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id" class="list-complete-item"></app-stock>
      </transition-group>
    </div>

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
  watch: {
    selected(){
      this.updateItems()
    }
  },
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
