const assert = new Proxy(
  {},
  {
    set(target, p, value) {
      console.log(target);
      if (!value) {
        console.error(p);
      }
    }
  }
);
const weather = "cold";
assert["the weather is not good"] = weather === "good";
console.log(assert);
