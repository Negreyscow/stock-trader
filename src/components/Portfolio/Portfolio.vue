<template>
  <div style="width: 100%">

    <app-order 
      @updateStocks="updateStocks"
      :isStocks="false"
    />

    <div class="row d-flex" style="justify-content: center">
      <transition-group class="row d-flex justify-content-center" name="list-complete" tag="div">
        <app-stock 
          :key="stock.id" 
          v-for="stock in stocks" 
          :stock="stock" 
          class="list-complete-item"
        />
      </transition-group>
    </div>

  </div>
</template>

<script>
import { orderStocksMixin } from "../utils/orderFunctions.js";
import Stock from "./Stock.vue";
import Order from "../Order.vue"

export default {
  data(){
    return {
      stocks: []
    }
  },

  components: {
    appStock: Stock,
    appOrder: Order
  },

  methods: {
    updateStocks(stocks){
      this.stocks = stocks
    }
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
