React 中的事件跟传统的 DOM 元素的事件区别不大，基本原理是相同的，有一些细节上的差异。本节就来瞄准 React 条件下的事件处理。

## 基本语法

先来看看基本语法，看看对比 DOM 元素事件有哪些差别。

首先，React 事件是用骆驼拼写法命名的，而不是小写，事件处理器（ Event Handler ）是函数，而不是字符串。

```js
<button onclick="handleClick()">
  Click
</button>
```

对于 DOM 元素，事件名 `onclick` 全部小写，等号后面是一个字符串。

```js
<button onClick={handleClick}>
  Click
</button>
```

到 React 这里 onclick 的 on 后面的 C 变成了大写，也就是采用了骆驼拼写法，同时后面的事件处理器是用大括号包裹的一个函数，不再是字符串了。

其次，React 中防止默认行为必须使用 preventDefault ，不能用 `return false` 了。

```js
const ActionLink = () => {
  const handleClick = e => {
    e.preventDefault()
    console.log('Clicked')
  }
  return (
    <a href="/sth" onClick={handleClick}>
      Click me
    </a>
  )
}
```

注意，这里的 `e` 跟 DOM 条件下的也有差别，主要是拥有了更好的浏览器兼容性。React 事件的详细参考资料在官方文档上可以找到 https://reactjs.org/docs/events.html 。

关于，事件处理的基本语法咱们就聊到这里。

## 事件响应函数中修改 state

实际中非常常见的一种使用情形就是，在事件处理函数中修改 state ，state 一变，界面就会自动更新了。下面来看看事件跟 state 配合使用的例子。

```js
class Toggle extends Component {
  state = { isToggleOn: true }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'))
```

当采用 ES6 class 定义组件的时候，常见的做法就是用 class 的方法作为事件处理函数（ handler )。例如，这里的 Toggle 组件首先初始化了 state ，把 isToggleOn 意思是”开关打开“，设置为 true 。

接下来，使用 create-react-app 环境下支持的这种类字段新语法，handleClick 直接赋值为一个 es6 函数，这样的好处是里面直接使用 this 而无需绑定。由于 `this.setState` 的异步性，所以参数不能传入对象，而要传入一个函数，才能稳妥的基于之前的状态来获得最新状态值。

渲染了一个按钮，监听 onClick 事件，传入 this.handleClick 作为处理函数。

浏览器中，点按钮，可以让用户在 ON 和 OFF 直接切换。

关于如何通过事件响应函数来修改 state ，就演示到这里。

## 传递参数

接下来看看如何给事件处理函数传入参数。

```js
import React from 'react'
import ReactDOM from 'react-dom'
class List extends React.Component {
  deleteRow = id => {
    console.log(id)
  }

  render() {
    return <button onClick={() => this.deleteRow(2)}>Delete Row</button>
  }
}

ReactDOM.render(<List />, document.getElementById('root'))
```

比如有一个列表，这里封装成 List 组件。里面 deleteRow 需要接受行号，这里就是 id ，才能知道要删除哪一行的内容。

下面 render 中，咱们就不渲染一个列表了，直接给一个按钮, 传参的正确方式就是添加一个 es6 的箭头函数，把本行 Id ，例如 2 传递给处理函数。

浏览器中，点按钮，打印出了 2 。

那如果 deleteRow 中，还想要事件对象呢？

```js
  deleteRow = (id, e) => {
    console.log(id, e)
  }

  render() {
    return <button onClick={e => this.deleteRow(2, e)}>Delete Row</button>
  }
```

大括号中传入一个回调函数，第一个参数就是 e ，这样，把 e 传递给 deleteRow 使用即可。到浏览中就可以看到 id 和 e 都打印出来了。

关于如何给事件处理函数传参数，就聊到这里。

## 总结

这节聊的是 React 的事件处理，主体内容就是这么多。关键知识点有这么几个：第一，React 的事件处理跟 DOM 事件处理思路一致，有几个小的细节差异需要记住。第二，React 事件最常见的使用情形之一就是在事件处理函数中去修改 state 。第三，事件处理函数中也可以传递参数。

参考

- https://reactjs.org/docs/handling-events.html
