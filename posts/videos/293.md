使用 React 写界面的时候，会直接在 JS 文件中使用很多 html 标签内容，而且这些内容是不符合 JS 基本语法的。类似

```js
const element = <h1>Hello</h1> 
```

这种标签语法，只有放到 React 环境中解析才不会报错，这就是 React 首创的 JSX 语法。JSX 是 React 对基本 JS 语法做出的一种扩展。JSX 中 ”JS" 就代表 JS 语言，”X“就代表 XML ，或者说就代表 tag 标签，JSX 说白了就是”在 JS 中使用的标签语法“。

## 为何要使用 JSX ？

JSX 是一个开创性的语法，虽然现在已经占据主流位置，但是早期是非常受到争议的，所以我们首先要回答的问题是，为何要使用 JSX 。

首先，React 认为项目复杂度的拆分不应该是按照语法类型，而应该按照功能单元。传统上写 Web 应用，最佳实践是，不要把 JS ，html ，css 混到一起写，要写到独立的文件中，大家都认为这样可以代码写的清晰很多。但是实际上 React 认为，Web 项目的界面正在变得越来越灵活和复杂，同一个功能单元的 JS 和 html/css 的结合越来越紧密，把结合特别紧密的内容拆分到不同文件中，只能让代码变得更不容易维护。所以 React 拆分复杂度的方式不是按照代码的语法类型，而是按照功能。这里必须要提到的一个概念就是组件，React 项目中，把完成同一个功能的 html 和 JS ，甚至有时还有 css 内容都放到一个文件中的一个组件内。一个组件完成一个功能。这个就是 React 的组件化思想，也是 JSX 使用的背景。

其次，JSX 是用代码去操作 html ，而不是把代码嵌入到 html 中，所以灵活度更高。当然，即使项目是按照组件思想拆分的，例如跟 React 形成竞争关系的 Vuejs 框架条件下，组件中依然可以选择不使用 JSX 而是用模板。模板是一种比较传统的写 Web 界面的方式了，直到今天依然很有市场，但是 JSX 语法提供了更高的灵活性。模板中实现逻辑，是通过自创的一套专用的脚本，而 JSX 中实现逻辑用的就是 JS 语言本身的各种语法。因为 JSX 的本质是 JS 中嵌入 html ，而模板的本质是 html 中嵌入一套逻辑残缺的脚本。

关于为何要使用 JSX ，主要就是上面这两点原因了。

## 基本用法

下面马上来看看 JSX 的基本用法。

首先，JSX 语法是需要 React 环境支撑的，假设我们已经安装了 create-react-app https://github.com/facebook/create-react-app 。

```
create-react-app my-app
cd my-app
npm start
```

这样，创建一个 `my-app` 项目，其中的 JS 文件就会被交给 React 环境处理了，所以遇到 JSX 语法的语句也不会报错了。

下面打开创建好的 src/index.js 文件，删除所有内容然后重新来写里面的内容。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1>Hello</h1>

ReactDOM.render(element, document.getElementById('root'))
```

来介绍一下每一行的作用：

- 第一步导入 React ，虽然下面用不到 React 这个变量，但是因为下面用了 JSX 语法，所以必须在本文件内有 React 才能工作。
- 下一步导入 ReactDOM，使用它的 render 接口可以把 JSX 标签渲染到对应的 DOM 节点上。
- 接下来赋值给 element 变量的这些跟 html 看起来很像的内容，就是 JSX ， element 就是一个 React 的元素了。
- 最后用 ReactDOM 渲染到页面上的 id 为 root 的节点上，注意，这个 root 节点在 public/index.html 文件中。

到浏览器中，看到 JSX 内容转换成了 html 显示了出来。

这就是 JSX 最基本的用法了。

## 在 JSX 中使用 JS 逻辑

JSX 的强大性就在于，可以把 JS 的整个语言逻辑运用到写界面的过程中，而不用像模板一样实现出自己的一套逻辑残缺的脚本。

首先，咱们可以任意地在 JSX 当中使用 JS 表达式。

```js
import React from 'react'
import ReactDOM from 'react-dom'

const user = {
  firstName: 'Peter',
  lastName: 'Wang'
}

const formatName = user => `${user.firstName}  ${user.lastName}`
const element = <h1>Hello, {formatName(user)}</h1>

ReactDOM.render(element, document.getElementById('root'))
```

定义 formatName 方法，拼接姓和名为一个全名。user 对象中包含两个字段，姓和名。 JSX 中的表达式要包含在大括号里。

浏览器中，打印出了 Hello 和 user 的全名。

这就是在 JSX 中嵌入表达式的具体方式。这种方式看起来跟使用模板比较类似，是把 JS 嵌入到 html 标签中。

但是 JSX 的灵活性其实还体现在可以把 html 标签嵌入到 JS 代码中。

```js
const element = user => {
  if (user) {
    return <h1>Hello, {user}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}

ReactDOM.render(element('Peter'), document.getElementById('root'))
```

可以吧 `element` 定义为一个函数，这里 element 实质上就是一个组件了。但是这里我们不关注组件的概念，关键可以看到，html 标签嵌入到了 JS 逻辑中。

总之，我们可以看到使用 JSX 写界面的时候，可以充分利用 JS 已有语法，不但灵活强大，而且不用像在模板中那样重造轮子，发明一套逻辑残缺的专用脚本出来。到官方的 JSX 介绍页面 https://reactjs.org/docs/introducing-jsx.html ，可以看到 JSX 相关的更多实用技巧，例如如何在 JSX 中指定属性，如何在 JSX 中进行标签嵌套，JSX 如何防止脚本注入攻击等内容，这里就不一一展开了。

## 总结

这一节是对于 JSX 一个简介，内容就是这些了。总结起来聊了三项内容：第一项，为啥要使用 JSX ，原因有两个：第一 React 是用组件化思想来拆分复杂度的，第二，JSX 比传统的模板方式灵活。第二项，演示了 JSX 的基本用法。第三项，演示了如何在 JSX 中实现各种逻辑。

参考

- https://reactjs.org/docs/introducing-jsx.html
