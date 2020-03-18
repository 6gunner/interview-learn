<template>
    <p>hello</p>
</template>
<script>

  export default {
    beforeCreate () {
      // 只是初始化了一些生命周期函数，以及event。
      console.log('child before create')
    },
    created () {
      // 创建了data、props、computed等
      console.log('child created')
    },
    beforeMount () {
      console.log('child before mount')
    },
    mounted () {
      console.log('child mounted')
    },
  }
</script>
