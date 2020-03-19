<template>
    <p>{{msg}}</p>
</template>
<script>

  export default {
    props: {
      msg: String,
    },
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
    beforeUpdate: function () {
      console.log('child beforeUpdate');
    },
    updated: function () {
      console.log('child updated');
    },
    beforeDestroy () {
      console.log('child beforeDestroy被调用')
    },
    destroyed () {
      console.log('child destroyed被调用')
    }
  }
</script>
