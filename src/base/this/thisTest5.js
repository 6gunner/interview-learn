let a = 3; // 第一个执行
function c() {
  console.log(a); // 打印3，因为指向window
}
(function() {
  let a = 4; // 第二个执行
  c();
})();
