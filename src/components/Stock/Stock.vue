<template>
  <div class="card-padding">
    <div class="card">
      <div class="card-header d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <h3 class="card-title font-sizing">{{ stock.name }}</h3>
          <div class="card-subtitle">(Price: {{ stock.price | currency }})</div>
        </div>
        <div class="p-2 flex-fill bd-highlight">
          <img class="img-size" :src=" '../../assets/' + stock.img">
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-center">
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
            style="float: right; margin-left: 5px "
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
        quantity: this.quantity,
        img: this.stock.img
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
  padding: 5px;
}

.font-sizing {
  font-size: 20px;
}

.img-size {
  width: 50px;
}
</style>
