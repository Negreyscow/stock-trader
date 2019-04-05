<template>
  <div class="col-md-3 card-padding">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ stock.name }}</h3>
        <div class="card-subtitle">(Price: {{ stock.price | currency }})</div>
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
            @click="buyStock()"
            class="btn btn-success"
            :disabled="insuficientFunds || quantity <= 0"
            style="float: right; "
          >{{ insuficientFunds ? 'Insuficient funds' : 'Buy' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0
    };
  },
  props: ["stock"],
  computed: {
    getFunds() {
      return this.$store.getters.funds;
    },
    insuficientFunds() {
      return this.quantity * this.stock.price > this.getFunds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      console.log(order);
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
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
