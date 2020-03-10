<template>
  <div class="row d-flex flex-fill justify-content-center">

    <app-order 
      @updateStocks="updateStocks" 
      :isStocks="true"
    />

    <transition-group class="row d-flex justify-content-center" name="list-complete" tag="div">
      <app-stock 
        v-for="stock in stocks" 
        :stock="stock" 
        :key="stock.id" 
        class="list-complete-item"
      />
    </transition-group>

  </div>
</template>

<script>

import Stock from "./Stock.vue";
import Order from '../Order.vue'

export default {
  data(){
    return {
      stocks: []
    }
  },

  methods: {
    updateStocks(stocks){
      this.stocks = stocks
    }
  },

  components: {
    appStock: Stock,
    appOrder: Order
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
