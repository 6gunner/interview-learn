import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if (navigator.serviceWorker) {
  runtime.register().then(registration => {
    console.log('congrats. scope is: ', registration.scope)
    return new Promise((resolve, reject) => {
      const internal = setInterval(() => {
        if (registration.active) {
          clearInterval(internal);
          resolve(registration.active);
        }
      }, 500)
    });
  }).then(sw => {
    sw.postMessage('343232432')
  })
    .catch(error => {
      console.log('sorry', error)
    })
}


