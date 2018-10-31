React 是用来做前端开发的一套非常强大的框架，仅仅就搭建 React 开发环境来讲其实就比较复杂，如果你对 Webpack 和 Nodejs 脚本非常熟悉，可能会考虑从头搭建自己的 React 开发环境。但是对于新人，最佳的策略是采用 Facebook 官方提供的 Create-react-app https://github.com/facebook/create-react-app 这个工具来创建项目脚手架代码，这样开发环境问题也就解决了。

## 安装

我们先来把这个 create-react-app 工具安装上。

```
npm i -g create-react-app
```

`i` 是 install 的简写，`-g` 表示 global ，全局安装。一般如果包里面包含系统命令，就需要全局安装。这里补充一下，npm 装包的时候，如果不加 `-g` 选项，就默认是局部安装，局部安装的包会存放到项目内的 `node_modules` 文件夹内，作用范围就是这个项目。而对应的全局安装的包不存在任何项目内，一次安装，全局可用，所以叫做全局安装。

```
create-react-app my-app
```

接下来，重新打开一下命令行窗口，就可以找到 `create-react-app` 这个命令了。运行命令，创建名为 `my-app` 的项目。

```
cd my-app
npm start
```

进入项目，运行 `npm start` 就可以把环境运行起来了。这里 `start` 是一个 npm script ，npm 脚本，可以到 package.json 中的 scripts 一项下找到这个脚本。

package.json

```json
 "start": "react-scripts start",
```

实际执行 `npm start` 的时候，真正得到执行的是 `react-scripts` ，而这其中执行了哪些任务我们就不必深究了，属于 `create-react-app` 帮我们提供的开发环境的一部分。

这样，浏览器中就可以看到项目运行起来了。

### 文件结构介绍

下面来粗略的介绍一下，脚手架代码的基本结构。

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

- README.md 中写项目说明，这个不是代码。
- node_modules 里面都是 npm 装包，这个文件夹名要写到 .gitignore 文件里面，避免被 git 跟踪。
- package.json 是任何的 Nodejs 项目都必备的一个文件，里面记录项目的配置信息，例如项目依赖的 npm 包的版本号，以及 npm 脚本等。
- .gitignore 不想让 git 跟踪的内容就写到这里面。
- public 文件夹下是一些静态内容，包含网站小图标 favicon.ico ，一个基本为空网站主页 index.html ，还有一个 manifest.json 声明文件，这个文件只有写 PWA 的时候才需要。
- src 中是真正的项目源码，其中包含 JS 和 CSS 文件，React 项目的 html 标签都是用 JS 渲染出来的，所以源码这部分看不到 html 文件。如果我们写的不是 PWA 的话， serviceWorker.js 这个文件可以删除。

关于脚手架代码的基本结构，我们就介绍到这里了。

## 环境中包含的功能

环境中包含的功能很多，我们挑几个比较重要的简单说说。

首先是自动刷新和报错功能。项目启动好之后，修改一下代码，页面就会自动刷新。如果遇到 bug ，网页上还有命令行中就都可以看到报错信息。

另外，对于 ES6 的某些新特性，浏览器是不支持的，但是在这个环境下，就可以放心使用，因为环境会自动把 ES6 转换成浏览器支持的 JS 代码。甚至包括一些比 ES6 更新的版本中的语言特性，例如对象展开运算符，环境也都可以帮我们转换。

其他很多功能也都是很实用的。例如环境可以自动给 CSS 添加厂商前缀，保证浏览器兼容。自带测试环境，自带对 TypeScript 和 Flow 的支持。

关于环境中都包含哪些功能，官方 README 中有一个详细的列表 https://github.com/facebook/create-react-app#whats-included ，这里我们就不一一说明了。

## 总结

这节我们通过 Create-react-app 这个脚手架工具，把 React 的开发环境跑了起来。但是，能提供 React 开发环境的工具不只是这一个，Peter 自己常用的有另外两个 https://www.gatsbyjs.com/ 和 https://react-static.js.org/ ，也都非常好用，而且带有各自独特的功能。但是最通用和对新手友好的还是 Create-react-app 。
