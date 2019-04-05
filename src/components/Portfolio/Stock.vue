<template>
  <div class="col-md-3 card-padding">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ stock.name }}</h3>
        <div
          class="card-subtitle"
        >(Price: {{ stock.price.toFixed(2) }} | Quantity: {{ stock.quantity }})</div>
      </div>
      <div class="card-body">
        <div class="row">
          <input
            type="number"
            class="form-control"
            style="display: block-inline; width: 30%;"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger: insuficientFunds}"
          >
          <button
            @click="sellStock()"
            class="btn btn-info"
            :disabled="insuficientFunds || quantity <= 0"
            style="float: right; "
          >{{ insuficientFunds ? 'Insuficient quantity' : 'Sell' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      quantity: 0
    };
  },
  props: ["stock"],
  computed: {
    insufficientFunds() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        quantity: this.quantity,
        stockPrice: this.stock.price
      };
      this.placeSellOrder(order);
    }
  }
};
</script>

<style scoped>
.danger {
  border: 2px solid red;
}
.card-padding {
  padding: 10px;
}
</style>
