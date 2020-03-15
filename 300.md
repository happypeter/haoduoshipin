界面上显示一个列表是非常常见的，React 中显示列表主要涉及到 JS 的 map 方法的使用，以及 React 自己的 key 的使用。

## JS 的 map 方法

我们先来熟悉一下 JS 语言自带的 map 方法。

map 故名思议就是映射，映射就是一一对应。给定一个数组，执行它的 map 方法后，得到的还是一个元素数量相等的数组，同时新数组中的每一个元素跟老数组形成一一对应关系。

来看一个最简单的例子。

```js
const a = [1, 2, 3]
const b = a.map(num => num * 2)
console.log(b)
```

给定一个数组 a ，每个元素是一个数字。我想要得到一个新的数组 b ，b 里面的每一个元素是 a 中对应元素的两倍。所以就可以调用数组的 map 方法，具体每个元素的转换规则，通过 map 的参数来指定。注意，这个参数不是一个普通的数据，而是一个回调函数，回调函数的参数是原数组中的当前元素，函数的返回值就是新数组中的对应元素。打印出 b 的值，发现果然是 `[2, 4, 6]` 。

这就是 JS 的 map 方法的基本使用方式了。

## 渲染列表

有了 map 方法，页面上渲染一个 List 就比较容易了。

src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

const messages = ['hello', 'hi', 'how are you']

const List = props => {
  const { messages } = props

  const list = messages.map(t => <li>{t}</li>)
  return <ul>{list}</ul>
}

ReactDOM.render(<List messages={messages} />, document.getElementById('root'))
```

一个 messages 数组，里面有三个字符串。定义 List 组件，从属性中拿到 messages 。这里，map 的作用依然是对数组中的每一个元素进行一下转换，转换方式就是给每一个数据，对应我们这里就是每一个字符串添加上 html 标签，让它变成一个元素。这样，通过 map 就生成一个多元素组成的数组，我们把这样的数组叫元素数组，也就是这里的 list 。元素数组是可以在 JSX 中直接显示出来的。当然这里要注意，一个组件中不允许返回多个 dom 节点，所以要用 ul 标签包裹元素数组 list 。

浏览器中，看到列表显示正常。但是终端中有报错，原因是每一个列表条目都应该有一个独一无二的 key 。

## key

key 对 JSX 的列表非常重要，因为 React 要通过元素的 key ，去定位这个元素，以便去删除或者修改这个元素。所以 key 必须是要独一无二的，同时 key 必须是固定的，不能变来变去。

这里直观的思路是用数组的 index 值去做 key ，这样可以做到独一无二，但是问题是如果数组增删了元素，一些元素的 index 就会变，所以用 index 做 key 值是不推荐的。而实际中，数据从数据库中读出来之后一般都自带独一无二，终身不变的 id 值，把数据的 id 作为 key 是非常常见的做法。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const messages = [
  {
    id: 1,
    text: 'React'
  },
  {
    id: 2,
    text: 'Re: React'
  },
  {
    id: 3,
    text: 'Re:Re: React'
  }
]

const List = props => {
  const { messages } = props

  const list = messages.map(t => <li key={t.id}>{t.text}</li>)
  return <ul>{list}</ul>
}

ReactDOM.render(<List messages={messages} />, document.getElementById('root'))
```

所以咱们这里也把字符串数组改写成对象数组，来把 id 配上。下面 List 组件中，用 id 做 key 即可。浏览器中可以看到，报错没有了。

关于 Key 的介绍，就到这里了。更多的一些使用细节可以参考官方文档：https://reactjs.org/docs/lists-and-keys.html 。

## 总结

本节介绍了 React 中如何去显示列表，主要由这么几个重要的知识点：首先，map 方法可以把纯数据数组，转换成元素数组，而元素数组是可以直接在 JSX 中进行渲染的。其次，JSX 语法要求，一个组件不能返回多个 DOM 节点，所以必要的时候要给元素数组外面再包裹一层标签。第三，渲染列表的时候，每一个列表项要有 key ，key 的选取要满足两大原则，独一无二和永远不变。
