<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" id="name" href="#">Hello {{username}}</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username"]
};
</script>

<style scoped>
</style>