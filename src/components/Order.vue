<template>
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
    </div>
</template>

<script>
import { orderStocksMixin } from "./utils/orderFunctions.js";
export default {
    mixins: [orderStocksMixin]
}
</script>

<style>

</style>
