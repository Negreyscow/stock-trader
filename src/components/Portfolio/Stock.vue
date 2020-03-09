<template>
  <div class="card-padding">
    <div class="card">
      <div class="card-header d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <h3 class="card-title font-sizing">{{ stock.name }}</h3>
          <div class="card-subtitle">
            Price: {{ stock.price.toFixed(2) }}
            <br>
            Quantity: {{ stock.quantity }}
          </div>
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
            :class="{danger: insufficientQuantity}"
          >
          <button
            @click="sellStock()"
            class="btn btn-info"
            :disabled="insufficientQuantity || quantity <= 0"
            style="float: right; margin-left: 5px "
          >{{ insufficientQuantity ? 'Insuficient quantity' : 'Sell' }}</button>
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
    insufficientQuantity() {
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
.font-sizing {
  font-size: 20px;
}

.img-size {
  width: 50px;
}
</style>
