<template>
    <p>{{this.message}}</p>
</template>
<script>

  export default {
    name: 'HelloWorld',
    props: {
      message: String,
    }
  }
</script>
