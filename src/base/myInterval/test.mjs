import { myInterval, clearMyInterval } from "./myInterval.mjs";
let i = 0;
const interval = myInterval(() => {
  console.log(i);
  i++;
  if (i > 4) {
    clearMyInterval(interval);
  }
}, 100);

export default {};
