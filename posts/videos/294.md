组件（ Component ）， 是 React 最重要的概念之一。组件可以由多个元素构成，多个组件又能够组合成更大的组件。

## 元素

先来聊什么是元素，元素（ element ）是一个 React 应用的最小组成单元。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1>Hello, world</h1>

ReactDOM.render(element, document.getElementById('root'))
```

在 create-react-app 创建好的项目中，打开 src/index.js 写一些自己的代码。这里 element 就是一个元素，元素描述了我们在屏幕上会看到什么。React 元素不是组件，组件由元素构成。浏览器中，可以看到 element 元素显示到了页面上。

这就是 React 的元素了，其实跟 Html 的元素类似，只是语法上有一些差异。

## 函数式和 class 式组件

接下来看看什么是组件。组件（ components ）可以让我们把 UI 分割成独立的可以复用的片段。概念上来讲，组件类似于 JS 的函数，它接收任意的输入，组件的输入有一个固定的名字 props ，翻译过来就是属性，而组件的返回结果就是元素。

定义一个组件最简单的方式是写一个 JS 的函数

```js
import React from 'react'
import ReactDOM from 'react-dom'

const Welcome = props => {
  return <h1>Hello, {props.name}</h1>
}
const element = <Welcome name="Sara" />

ReactDOM.render(element, document.getElementById('root'))
```

这个函数就是一个完整的 React 组件，因为它接收一个 props 对象作为参数，返回一个 React 元素。这样的组件叫做函数式组件，因为它的确就是个函数。组件中不但可以包含 Html 标签，也可以包含数据和 JS 代码，甚至也可以包含 CSS 。到浏览器中，看到组件运行正常。

另外一个定义组件的方式就是使用 ES6 的 class

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

const element = <Welcome name="Sara" />

ReactDOM.render(element, document.getElementById('root'))
```

从 React 的角度，上面两个组件是等价的。传统上 Class 组件比函数组件功能多一些，例如可以使用生命周期函数和使用状态值，但是到了 16.7.0 以上的版本中，函数组件就拥有了所有的这些能力，所以 Class 组件未来会很少用了。浏览器中，可以看到组件运行正常。

这就是 React 的组件的使用方式了。

## 组件的组合

最后要提的是，组件本身可能有很多元素组成，但是同时，组件中也可以使用其他组件，这就是组件的组合。

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

const App = () => {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

例如可以有一个 App 组件，里面使用很多次 Welcome 组件。浏览器中，果然显示了三个 Welcome 。

关于组件的组合，咱们就聊这么多。

## 总结

React 的组件化思想，是拆解 Web App 复杂度的一种新的方式，通过上述的元素，组件，组件组合这三个概念，可以看到组件化思想下，可以把项目代码组织的非常层级分明。

参考

- https://reactjs.org/docs/components-and-props.html
