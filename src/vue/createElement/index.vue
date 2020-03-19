<template>
    <p>{{this.message}}</p>
</template>
<script>

  export default {
    name: 'Hello World',
    props: {
      message: String,
    }
  }
</script>
