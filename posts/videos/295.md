这集要聊的是另外一个 React 最重要的概念之一，也就是 State ，状态。 State 跟前面提过的属性 Props 类似，但是状态是组件私有的完全被组件自己控制的数据。

## State 的基本使用

先来看看 State 的基本使用方式。目前我使用的是 16.6.0 版本的 React ，函数式组件中还不能支持 State ，但是未来版本中会支持的。

src/index.js

```js
class App extends Component {
  render() {
    return <div>0</div>
  }
}
```

先到 src/index.js 中来添加一个普通的类组件。这里显示了0，如果0只是作为一个字符串显示，那么就没有必要抽出成 State ，但是对于一些会发生变化的内容，就要抽出成 State 。

```js
class App extends Component {
  state = {
    count: 0
  }

  render() {
    return <div>{this.state.count}</div>
  }
}
```

具体方式就是，定义一个名为 state 的对象，里面的每个属性就是一个 state 了。例如，这里有了一个 state 叫做 count ，对应的值是0。下方 JSX 中，用 `this.state.count` 就可以得到 state 值了。

这就是 state 使用的基本方式。

## 如何更新 State

如果 state 数据不更新，就看不出 state 有什么意义。下面来看看如何更新 state 。

```js
  handleClick = () => {
    console.log('Clicked!')
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
```

这里我们需要在组件中添加一个按钮，点击按钮触发一个 event ，关于 event ，这里我们不展开。如果要响应点击事件就用 `onClick` 指定一个事件处理函数即可，这里的函数名叫做 handleClick。定义 handleClick ，里面打印一条信息。浏览器中可以看到信息打印出来了，表示事件处理函数运行良好。

更新 state 时要特别注意，不允许直接赋值修改。

```js
  handleClick = () => {
    console.log('Clicked!')
    this.state.count = 1
  }
```

这种写法是错误的。

正确的方式是使用 setState 来更新状态值。

```js
  handleClick = () => {
    console.log('Clicked!')
    this.setState({
      count: 1
    })
  }
```

这样，浏览器中再点一下按钮，state 值就更新为1了。至于为何有这个规定，咱们这里不深究，简单来讲 ，React 坚持函数式编程思想，而保持变量不变性是函数式编程的基本原则。

除了不可直接修改 state 值，另外一个要特别注意的问题是，setState 是个异步函数，这就造成不能直接根据上一个 state 值来生成下一下 state 值。比如我们想让每次点按钮的时候 count 都加一。


```js
// Wrong
this.setState({
  count: this.state.count + 1 
});
```

直观的想法就是写成这样。但是由于 setState 是异步的，也就是说，第二次触发 setState 的时候，第一次未必已经执行完毕，所以直接用上次的 state 去更新这次的 state ，是不可靠的。


```js
// Correct
this.setState((state, props) => ({
  count: state.count + 1
}))
```

好在 setState 有专门的一种写法去应对这种情况，传递给 setState 一个回调函数，其中第一个参数 state 就可以放心的作为上一次 state 来使用了。

关于如何更新 state ，就聊这么多。

## 状态和属性的区分

初学者遇到的另外一个困难是不太容易区分 state 和 props ，所以本节最后一部分，聊聊二者的区别。关键把握一句话：props 是组件和外界联通的桥梁，state 是组件私有的。

我们先来理解一下前半句：props 是组件和外界沟通的桥梁。

```js
class Box extends Component {
  render() {
    return (
      <h3>
        父组件计数值：
        {this.props.num}
      </h3>
    )
  }
}

   <Box num={this.state.count} />
```

例如，给 App 组件添加一个子组件 Box ，显示 App 组件的 count 值，这个时候，就可以给 Box 设置一个 props 值叫做 num ，传递 count 给它，这样 App 的数据就可以传入 Box 组件中显示了。所以说 props 是组件连接外部的桥梁。

那么下半句“state 是组件私有”的，如何理解呢？首先说，当前组件的 state 不能直接在其他组件中使用，包括它的子组件。另外，当前组件的 state 值也不能在其他组件中去直接修改，这种限制形成了对组件的良好封装，保证了代码的逻辑简单。

关于 props 和 state 的区别，咱们就先聊到这里。

## 总结

这节关于组件状态，也就是 state ，就聊这么多。需要记住的是：首先， state 值是在组件中，通过定义 state 对象来设置初始值的，第二，state 值是不能直接修改的，而要使用 setState 来更新，第三，props 是组件跟外界沟通的桥梁，而 state 是组件私有的数据。
