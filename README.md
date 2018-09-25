# mifanfan-loadable

## 用法

```

const LoadableComponent = Loadable({
  loader: () => import('./Async'),
  loading: () => (<div>strong</div>),
  doneCallback: (component) => { console.log('done', component) },
  errorCallback: () => {console.log('error')}
  timeout: 10000,
});


```

## api

loader: 异步请求js模块的的回调函数
loading: loading动画
doneCallback: 当js模块请求完毕，并且渲染完后，也就是update后，调用此回调函数,同时会将返回的component当做第一个参数传给回调函数同时会将返回的component当做第一个参数传给回调函数

timeout: 当时间超过一定时间后，还没有渲染完成，就会给loading组件传递timeOut props
errorCallback: 当js模块加载出现错误后，进行回调




