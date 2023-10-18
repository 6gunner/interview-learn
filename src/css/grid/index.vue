<template>
  <div>
    <fieldset class="fieldset">
      <legend>
        grid-template-1
      </legend>
      <div class="grid1">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-template-2
      </legend>
      <div class="grid2">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-template-auto-fill
      </legend>
      <div class="grid-auto-fill">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-template-auto-fit
      </legend>
      <div class="grid-auto-fit">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-template-area
      </legend>
      <div class="grid-template-area">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-auto-flow
      </legend>
      <div class="grid-auto-flow-row">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
        <div class="item item-8">8</div>
        <div class="item item-9">9</div>
      </div>

      <div class="grid-auto-flow-column">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
        <div class="item item-8">8</div>
        <div class="item item-9">9</div>
      </div>

      <div class="grid-auto-flow-dense">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
        <div class="item item-8">8</div>
        <div class="item item-9">9</div>
      </div>
    </fieldset>

    <fieldset class="fieldset fieldset-wide">
      <legend>
        grid-justify-content
      </legend>
      <div class="grid grid-justify-content">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend>
        grid-column-span
      </legend>
      <div class="grid grid-column-span">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
        <div class="item item-8">8</div>
        <div class="item item-9">9</div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.fieldset {
  width: 400px;
}
.fieldset-wide {
  width: 800px;
}
.grid {
  display: grid;
  grid-template: 1fr 1fr / 100px 100px 100px;
}

.grid-justify-content {
  justify-content: center;
}

.grid1 {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
}

.grid2 {
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 70% 30%;
  grid-auto-rows: 50px;
}

.item {
  min-width: 50px;
  max-width: 100px;
  font-size: 2em;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.grid-auto-fill {
  display: grid;
  /* 每列最小宽100px，然后自动填充。 */
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.grid-template-area {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr 1fr 1fr;
  grid-template-areas: "a a . ." "a a . .";
}

.grid-template-area .item-1 {
  grid-area: a;
}

.grid-auto-flow-row {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-auto-flow: row;
}

.grid-auto-flow-column {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-auto-flow: column;
  margin-top: 10px;
}

.grid-auto-flow-dense {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  /* grid-auto-flow: dense;  */
  grid-auto-flow: row;
  /* grid-auto-flow: column dense; */
  margin-top: 10px;
}
.grid-auto-flow-dense .item-1 {
  grid-column-start: 2;
}

.grid-column-span .item-1 {
  /* 跨越两列 */
  grid-column: span 2;
  /* 跨越两行 */
  grid-row: span 2;
  width: 200px;
  max-width: 200px;
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}
</style>
