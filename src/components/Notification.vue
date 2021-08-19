<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 100">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <slot name="color">
          <div class="dot"></div>
        </slot>
        <!-- <img src="..." class="rounded me-2" alt="..." /> -->
        <strong class="me-auto"><slot name="title"></slot></strong>
        <!-- <small>11 mins ago</small> -->
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body"><slot name="body"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  created() {},
  data() {
    return {};
  },
  props: [],
  methods: {},
};
</script>

<style lang="scss" scoped>
.dot {
  height: 1em;
  width: 1em;
  margin-right: 1em;
  background-color: rgb(184, 55, 55);
  border-radius: 50%;
  display: inline-block;
}
</style>