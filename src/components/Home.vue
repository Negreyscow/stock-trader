<template>
  <div style="width: 80%; margin: auto; padding: 10px">
    <div class="card">
      <div class="card-header">Hello! {{ getUsername }}, This is your special trade application</div>
      <div class="card-body">
        <h5 class="card-title">Your funds {{ getFunds | currency}}</h5>
        <p class="card-text">To learn purposes only</p>
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
</style>
