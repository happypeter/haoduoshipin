当代的网站开发已经摆脱了重造轮子的时代。如果我们使用 JS ，那么几乎所有常见功能都可以在 npm 的包仓库中找到。

## 软件包仓库

先来介绍一下 npm 软件包仓库。

首先说，软件包仓库有很多种，但是 npm 的软件包仓库是世界上最大的一个。比如使用 Ubuntu 系统，有 deb 包仓库，使用 Ruby 语言，可以使用 gem 包仓库。JS 是一个用户量非常大的语言，同时也是一种非常崇尚开源的语言，导致了 Github 上 JS 的开源代码非常多。直接拷贝 Github 上的开源代码到项目中使用不是特别方便，所以常用的 JS 代码都被制作成了 npm 包，让大家可以方便的安装到自己的项目中。根据 npmjs.com 首页的介绍，目前为止 npm 仓库中已经有了大约80万个 npm 包，是世界上最大的免费可复用代码的集结地。

再来简单说两句软件包仓库的工作原理。软件包仓库，我们可以简单认为就存放在一个网站的服务器上，例如 npm 的软件包仓库对应的网站是 npmjs.com 。每当运行 `npm install xxx` 的时候，我们的电脑就会去连接 npmjs.com 的服务器，去下载 xxx 包。由于每个 npm 包都遵从了固定的格式规范，所以安装到项目本地之后，就可以到代码中按照规范导入并使用包里的代码了。

关于软件包仓库本身，我们就介绍到这里。

## 软件包拆解

下面咱们对一个 npm 包的内容做一下拆解，让我们更好的理解 npm 包的结构。

先写一个 Nodejs 脚本，里面要使用一个包 foo 。

index.js

```
require('foo')
```

假设有一个包名为 foo 的 npm 包，index.js 中用  `require` 导入一下 foo ，理论上就可以来使用了。

```
node index.js
```

但是此时，执行 index.js 会报错。

```
Cannot find module 'foo'
```

意思是没有找到 `foo` 这个模块，模块这个概念跟包是有差异的，需要详细了解的同学可以学习一下 ES6 模块和 Commonjs 模块的格式，不过这里我们就简单的认为一个 npm 包里面包裹了一个模块就可以了。模块就可以通过安装 npm 包的方式来添加到项目中，但是我们这里为了演示清楚一个包里面到底包含什么内容，以及一个 npm 包的安装位置是怎样的，所以不安装，而是直接去动手来添加 foo 。

```
mkdir node_modules
```

首先要说明的是，一旦执行到 `require('foo')` 这样的语句，Nodejs 就会去查找 `foo` 是不是 Nodejs 自带的模块，如果不是，就会去 npm 包的安装文件夹中去寻找。而这个文件夹就是当前项目文件夹，对应我这里的情况就是 my-project ，之内的 node_modules 。这里我们来手动创建一下，实际用命令装包的时候，这个文件夹会被自动创建。

foo/index.js

```js
console.log('foooo')
```

`node_modules` 中创建名为 foo 的文件夹，里面创建 index.js 文件，随便写一条打印语句。

再次运行 `node index.js` 可以看到，`foo` 文件夹中的代码得到了执行。

这样，一个 npm 包的基本结构我们就了解了，其实就是放到了特定位置的一些 js 文件。

## 使用包的实际过程

最后看一下，如何在真实项目中使用 npm 包。

每当我们需要某个包的时候，就可以到 npmjs.com 搜索一下，这样就能找到相应的包的精确的名字。例如，我们想要一个 markdown 格式解析工具，就搜 markdown ，结果中发现有不少类似的方案，没有特殊偏好的话，我一般会选择下载量最大的那个包来安装，这里显然 markdown-it 是下载量最大的，而这个包的精确的包名就是 markdown-it 。

```
rm -rf node_modules
npm init -y
npm install markdown-it
```

接下来，先把我刚刚创建的那个 `node_modules` 文件夹删除掉，`npm init -y` 来创建一个 package.json 文件，这个文件中会记录被安装的包的包名以及版本号，在 Nodejs 项目中，这个文件是必须要有的。然后运行 `npm install 具体包名` 来安装需要的包。安装完之后，可以看到 `node_modules` 被自动创建了，markdown-it 这个包就被存放到了这个文件夹里面。

index.js

```js
const MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
const result = md.render('# markdown-it rulezz!');
console.log(result)
```

下面来修改 index.js 中的内容。require 刚刚安装的包，然后调用里面的接口，把 markdown 格式的文本翻译成 html ，然后打印出来。运行 `node index.js` 可以看到 html 内容正确输出了。

这就是安装一个 npm 包，并且在项目中使用它的全过程了。

## 总结

这节咱们瞄准的是 npm ，这个世界上最大的可复用代码的仓库。主要内容就是这些，最后把最重要的几个点再提一下。首先，npm 存在的目的是避免 JS 开发者重复造轮子，让大家的劳动成果可以共享。npm 包中包裹了 JS 代码，同时 JS 代码的存放格式以及一个 npm 包安装到本地项目后的位置都是固定的，所以才可以在项目代码中直接通过 require 语句找到它。最后，我们演示了一个项目中使用 npm 包的流程，其中涉及使用 package.json 文件记录包版本。
