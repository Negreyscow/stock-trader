<template>
  <div class="d-flex p-2 flex-fill justify-content-center">

    <div class="d-flex justify-content-center bg">
      <form style="margin: auto">
        <div class="form-group">
          <label cl for="sel">Select stock</label>
          <select
            v-model="company"
            class="custom-select form-control"
            id="sel"
            :disabled="graph == 'MultipleSeries'"
          >
            <option disabled value>Select stock</option>
            <option v-for="company in Companies" :key="company.id">{{company.name}}</option>
          </select>
        </div>

        <div class="form-group">
          <label cl for="sel2">Select a type of graph</label>
          <select v-model="graph" class="custom-select form-control" id="sel2">
            <option disabled value>Select a graph style</option>
            <option>LineChart</option>
            <option>AreaChart</option>
            <option>MultipleSeries</option>
          </select>
        </div>

        <div class="form-group">
          <button
            class="btn btn-outline-secondary botao form-control"
            @click.prevent="showGraph"
          > 
            Go!
          </button>
        </div>

      </form>
    </div>

    <div class="d-flex graph">
      <line-chart :data="target" v-if="graph == 'LineChart'"></line-chart>
      <area-chart :data="target" v-if="graph == 'AreaChart'"></area-chart>
      <area-chart :data="target" v-if="graph == 'MultipleSeries'"></area-chart>
    </div>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      company: "Select a company",
      target: {},
      graph: "LineChart"
    };
  },

  computed: {
    ...mapGetters({
      historicPrices: "historicalStocksPrice",
      Day: "getDay",
      Companies: "getCompanies",
      companyData: "getCompanyData",
    })
  },

  methods: {
    ...mapActions({
      companyInfo: "companyData",
      companiesInfo: "companiesData"
    }),

    showGraph() {
      switch (this.graph) {
        case "AreaCharts":
        case "LineChart":
          this.target = {}
          for (let i = 0; i < this.historicPrices.length; i++) {
            Object.assign(this.target, { 
              [`Day ${i}`] :  this.historicPrices[i].find(s => s.name === this.company).price 
            });
          }
          console.log('target', this.target)
          break;

        case "MultipleSeries":
          break;

        default:
          break;
      }
    }
  }
}

</script>

<style>
.bg {
  background-color: #f9f9f9;
  width: 400px;
  border: 1px solid gray;
  border-radius: 20px;
}
.graph {
  width: 800px;
  margin: auto;
  margin-left: 20px;
  margin-right: 20px;
  float: none;
}
.select {
  margin-left: 40px;
  margin-right: 40px;
}
.botao {
  width: 100%;
  height: 40px;
}
</style>
