const book = {
  name: '明朝那些事',
  author: '当年明月',
  sections: [1, 2, 3]
}
// 这段代码会超出最大调用栈
// Object.defineProperty(book, 'name',{
//   configurable: true,
//   enumerable: true,
//   set (v) {
//     if (v == this.name) return;
//     this.name = v;
//   },
//   get () {
//     console.log('读取name');
//     return this.name;
//   }
// });

// 通过定义另一个属性去解决上面的问题
Object.defineProperty(book, 'bookName',{
  configurable: true,
  enumerable: true,
  set (v) {
    if (v == this.name) return;
    this.name = v;
  },
  get () {
    console.log('读取name');
    return this.name;
  }
});
book.bookName = '妖孽宫廷';
// 或者提前提取出变量的值，进行设置
let name = book.name;
Object.defineProperty(book, 'name',{
  configurable: true,
  enumerable: true,
  set (v) {
    if (v == name) return;
    name = v;
  },
  get () {
    return name;
  }
});
book.name = '粉饰太平';

// 测试一下数组的值能否监听到
let sections = book.sections;
Object.defineProperty(book, 'sections', {
  set(v) {
    console.log(`${v}被修改了`);
  },
  get () {
    return sections;
  }
});
console.log(book.sections);
book.sections.push(4);
console.log(book.sections);
// 都没有被触发

