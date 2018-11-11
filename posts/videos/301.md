聊聊 React 中表单的使用，主要涉及受控组件（ controlled component ）的概念。

## form 基本用法

React 下使用 form 基本就是下面这个套路：

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Form extends Component {
  state = { username: '' }

  handleChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = e => {
    console.log(this.state.username)
    e.preventDefault()
  }

  render() {
    return (
      <div>
        username:
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    )
  }
}

ReactDOM.render(<Form />, document.getElementById('root'))
```

初始化 state 值，username ，定义 handleChange 处理函数，里面修改 username 值。 handleSubmit 是提交时的处理函数。下面，render 中，添加一个 input 一旦它的 value 值等于 this.state.username ，那么 input 中的值就被控制为 username 这个 state 值了，用户就不能去直接修改了，需要让用户可以修改的方式就是添加 onChange 事件，处理函数用，运行修改 state 值的代码，从而达成修改 input 输入内容的目的。最后 button 按钮的 onClick 事件来触发提交行为即可。因为已经完全跳出了 html 的 form 提交方式，所以这里连 form 标签都可以省去了。

## 处理多个输入

再来看看有了多个输入怎么处理。

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Form extends React {
  state = { username: '', email: '' }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    console.log(`${this.state.username} ${this.state.email}`)
    e.preventDefault()
  }

  render() {
    return (
      <div>
        Username:
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br />
        Email:
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    )
  }
}

ReactDOM.render(<Form />, document.getElementById('root'))
```

在原来的基础上稍作修改即可。增加 email 这一项，handleChange 要做到适用于不同的 input ，就要通过一定的方式对 input 进行区分，后面会通过给每个 input 添加 name 属性的方式来实现，所以这里可以同时修改 username 和 email 两个 input 的。

handleSubmit 中打印出两项内容。

下面给两个 input 添加 name 属性。

浏览器中，可以同时提交 username 和 email 。

## 未来方案

React 核心团队目前正在给 React 组件格式做比较大的调整，具体来讲就是让用户可以在函数组件中也能使用 state ，所以未来 React 新版本中，将会能够用更简短的语法来构建 form ，这个我们要密切关注。

## 总结

关于，form 的使用，就是这些内容了。
