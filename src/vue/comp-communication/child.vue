<template>
  <div>
    我是child

    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: {
    name: String
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      console.log(this.$parent);
      console.log(this.$root);
    }
  }
};
</script>
<style></style>
