function add(base) {
  return () => {
    console.log(arguments); // 这里面拿的是addFive的参数
    const num = arguments[0];
    return num + base;
  };
}
const addFive = add(5);
console.log(addFive(1));
