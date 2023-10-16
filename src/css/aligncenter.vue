<template>
  <div>
    <div class="wp">
      <div class="box fixedsize aligncenter2">
        <span>
          测试-固定宽高
        </span>
      </div>
    </div>
    <div class="wp line-height-300 ">
      <div class="box aligncenter4">
        <span>
          测试-不定宽高
        </span>
      </div>
    </div>
    <div class="wp table-cell">
      <div class="box inline-block">
        <span>
          测试-不定宽高-table-cell
        </span>
      </div>
    </div>
    <div class="wp grid">
      <div class="box aligncenter5">
        <span>
          测试-不定宽高-grid
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.wp {
  position: relative;
  height: 300px;
  width: 300px;
  border: 1px solid red;
}
.line-height-300 {
  line-height: 300px;
}

.box {
  background: green;
  font-size: 10px;
}

.fixedsize {
  width: 100px;
  height: 100px;
}

.aligncenter1 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  display: inline-block;
  line-height: 100px;
  vertical-align: middle;
  text-align: center;
}

.aligncenter2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: inline-block;
  line-height: 100px;
  vertical-align: middle;
  text-align: center;
}

.aligncenter3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.aligncenter4 {
  display: inline-block;
  line-height: initial;
  vertical-align: middle;
  text-align: center;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.inline-block {
  display: inline-block;
}

.grid {
  display: grid;
}
.aligncenter5 {
  justify-self: center;
  align-self: center;
}
</style>
