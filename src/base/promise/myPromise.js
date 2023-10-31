const { reject } = require("underscore");

class MyPromise {
  constructor(executor) {
    this.fullfillCallbacks = [];
    this.rejectCallbacks = [];
    this.status = "pending";
    this.executor = executor;
    this.run();
  }

  resolve = val => {
    if (this.status == "pending") {
      this.status = "fullfilled";
      this.fullfillCallbacks.forEach(callback => {
        callback(val);
      });
    }
  };

  reject = val => {
    if (this.status == "pending") {
      this.status = "rejected";
      this.rejectCallbacks.forEach(callback => {
        callback(val);
      });
    }
  };
  run() {
    this.executor(this.resolve, this.reject);
  }

  then(onFullfill, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status == "pending") {
        // 这里的value是哪里来的？每次回调传的上次结果
        this.fullfillCallbacks.push(value => {
          try {
            const result = onFullfill(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(value => {
          try {
            const result = onRejected(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 1000);
// })
//   .then(ret => {
//     console.log(ret);
//     throw new Error(2); // throw an error to reject the Promise
//   })
//   .then(
//     ret => {
//       console.log(ret);
//     },
//     err => {
//       console.error(err);
//     }
//   );

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
  .then(ret => {
    console.log(ret);
    reject(2); // 虽然这里能访问到reject，也不知道怎么实现的，但是没效果，正常还是应该throw error
    // throw new Error(2); // throw an error to reject the Promise
  })
  .then(
    ret => {
      console.log(ret);
    },
    err => {
      console.error(err);
    }
  );
