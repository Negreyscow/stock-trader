<template>
  <div style="width: 80%; margin: auto; padding: 10px">
    <div class="card">
      <div
        class="card-header text-center header-text"
      >Hello! {{ getUsername }}, This is your special trade application</div>
      <div class="card-body">
        <h5 class="card-title text-center">Your have {{ getFunds | currency}} to spend!</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getFunds() {
      return this.$store.getters.funds;
    },
    getUsername() {
      return this.$store.getters.getUsername;
    }
  }
};
</script>
 
<style>
.header-text {
  font-size: 20px;
}
</style>
