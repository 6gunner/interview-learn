<template>
    <div id="lifecycle">
        <Hello></Hello>
    </div>
</template>
<script>
  import Hello from './hello';
  export default {
    props: {
      name: String,
      age: Number,
    },
    components: {
      Hello
    },
    data () {
      return {
        a: 1,
      }
    },
    computed: {
      b () {
        return this.a + 2
      }
    },
    beforeCreate () {
      // 只是初始化了一些生命周期函数，以及event。
      console.log('parent before create')
      // console.log(this.$data) // undefined
      // console.log(this.a) // undefined
      // console.log(this.$props) // undefined
    },
    created () {
      // 创建了data、props、computed等
      console.log('parent created')
      // console.log(this.$data)
      // console.log(this.a)
      // console.log(this.b)
      // console.log(this.$watch)
      // console.log(this.$props)
      // this.$watch('a', (newVal, oldVal) => {
      //   console.log(newVal)
      // })
    },
    beforeMount () {
      console.log('parent before mount')
      console.log(this.$options.render)
      // console.log(this.$el) // undefined

    },
    mounted () {
      console.log('parent mounted')
      // console.log(this.$el)
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》')
      console.log('%c%s', 'color:red', 'el     : ' + this.$el.innerHTML)
      console.log(this.$el) // 因为$el是一个对象，存储的是引用。所以用console.log打印时，显示的是变化后的$el
      console.log('%c%s', 'color:red', 'data   : ' + JSON.stringify(this.$data))
      console.log('%c%s', 'color:red', 'message: ' + this.a)
      console.groupEnd()
    },
    updated: function () {
      console.group('updated 更新完成状态===============》')
      console.log('%c%s', 'color:red', 'el     : ' + this.$el.innerHTML)
      console.log(this.$el)
      console.log('%c%s', 'color:red', 'data   : ' + JSON.stringify(this.$data))
      console.log('%c%s', 'color:red', 'message: ' + this.a)
      console.groupEnd()
    },
    beforeDestroy () {
      console.log('beforeDestroy被调用')
      console.log(this._isDestroyed) // false
    },
    destroyed () {
      console.log('destroyed被调用')
      console.log(this.$el);
      console.log(this._isDestroyed) // true
    }
  }
</script>
<style></style>
