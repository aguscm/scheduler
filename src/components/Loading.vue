<template>
  <div class="black-screen d-flex justify-content-center">
    <span class="sr-only">Loading...</span>
    <div class="spinner-grow text-light" role="status"></div>
    <div class="spinner-grow text-light" role="status"></div>
    <div class="spinner-grow text-light" role="status"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.black-screen {
  background-color: black;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  z-index: 6000;
}
.spinner-grow {
  margin: 0.3em;
}
</style>