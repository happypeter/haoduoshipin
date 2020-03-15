之前完成了使用 Nodejs 脚本的形式跟合约进行交互，但是实际上用户还是希望能有一个美观的 UI 可以用的。所以这节咱们就来基于 react 技术开发 DApp ，实现跟合约的交互。本节的最终代码都在 Github 仓库中的 dapp1 文件夹中：https://github.com/happypeter/NervFirst/tree/master/dapp1 。下面我们来说说具体的开发思路。


## 总体思路

先来说说 DApp 的总体架构。起码截止到目前，DApp 开发还是以 Web 架构为主，也就是说是可以跑到浏览器内的。本节我们使用 React 技术来开发 DApp 应用，这个在业界也是非常流行的，例如著名的 steemit 项目就是用 react 开发的，当然理论上讲任何的 Web 技术，或者是用 ios 或者 andriod 原生应用都可以开发 DApp 的。

我们本节开发的 DApp 跟真实的 DApp 还是有一个明显的不同，因为本节会承接上一节，继续把 DApp 使用者的账户信息，包括私钥，保存到源码中。这样，当 DApp 跟合约交互的时候，底层的 Nervos.js 会直接调用私钥进行签名，整个签名过程从界面上是看不到的。后续的小节中，我们会把私钥信息移除，采用 Nervos 官方的 DApp 钱包 neuron 来完成交易签名，不带私钥的源码才是正确的开发 DApp 的方式，因为只有这样每个用户才可以用自己的 Neuron 钱包打开 DApp ，去使用自己的账户去发交易，跟合约进行交互。当然这是后话。

本节中我们基本的思路就是把之前 interact 文件夹中的必要文件都拷贝到 react 项目中，然后就可以在浏览器中去跟智能合约进行交互了。

## 实现读取操作

先来创建一个新的 react 项目，然后把必要的文件内容拷贝过来，实现读取链上数据的操作。

```
create-react-app dapp1
yarn add @nervos/chain
```


我们通过 create-react-app 这个脚手架工具来生成项目，如果系统上没有这个命令需要提前 npm 全局安装一下。项目的名字叫 dapp1 ，在本文开始给大家的链接中可以看到 dapp1 中的最终代码。进入项目安装一下 Nervos.js 。


下面把 interact/ 中的各个不需要改动的文件直接拷贝到 dapp1/src 中。 需要拷贝的文件包括 config.js ，nervos.js ，simpleStore.js 和 transaction.js 。


App.js


```js
const nervos = require('./nervos')
const simpleStore = require('./simpleStore')

 componentDidMount = async () => {
    const from =
      nervos.appchain.accounts.wallet[0] &&
      nervos.appchain.accounts.wallet[0].address

    console.log('from', from)

    const times = await simpleStore.simpleStoreContract.methods.getList().call({
      from
    })
    console.log('times', times)
    const messages = await Promise.all(
      times.map(time =>
        simpleStore.simpleStoreContract.methods.get(time).call({ from })
      )
    )
    console.log('messages', messages)
  }
```

接下来到 App.js 中完成读取链上数据的操作。首先导入 nervos 和 simpleStore ，然后需要添加一个异步的 `componentDidMount` 函数，这个函数会在页面加载后自动执行。里面的内容就直接拷贝 interact/index.js 中的读取相关的代码即可。

```
yarn start
```

启动项目，浏览器中打开 console 可以看到顺利读取到了链上的数据。

## 写操作

接下来完成写操作。也是基本拷贝 interact/index.js 中的内容，配上上一点点 React 的受控组件的小知识。


App.js

```js
class App extends Component {
  state = {
    msg: ''
  }
  handleChange = e => {
    this.setState({
      msg: e.target.value
    })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const { msg } = this.state
    const time = new Date()

    const current = await nervos.appchain.getBlockNumber()
    const tx = {
      ...simpleStore.transaction,
      validUntilBlock: +current + 88
    }
    const res = await simpleStore.simpleStoreContract.methods
      .add(msg, +time)
      .send(tx)

    const receipt = await nervos.listeners.listenToTransactionReceipt(res.hash)
    receipt.errorMessage && console.log(receipt.errorMessage)
    this.setState({
      msg: ''
    })
  }
  ...
      <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.msg}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

```

添加的 state 值以及 handleChange 函数以及下面的 render 函数中的 form 都是 react 的基础知识，联合起来构成了一个 react 的受控的 input 组件。目的只有一个就是拿到用户输入的字符串。点提交按钮的时候，handleSubmit 函数就会执行。里面可以通过 this.state.msg 拿到用户输入的字符串。所以 react 的内容就是这些。handleSubmit 中其余的内容，跟 interact/index.js 就没有什么区别了。


浏览器中，提交一个留言，点下提交按钮后，界面会僵住几秒钟，当数据写入成功后，input 中的字符串被清空，表示提交成功了。刷新一下页面，终端中也可以看到最新提交的数据。

## 总结

到这里，我们就把之前的 interact/ 中实现的跟合约的交互功能移动到 DApp 中了。我们没有实现特别完善的用户体验，因为剩下的工作都是 react 相关技巧了，不是我们本课程的重点。官方的 Demo 仓库中的 first_forever 项目就是最终的效果大家可以去参考：https://github.com/cryptape/dapp-demos/tree/master/first_forever 。

同时在咱们课程的仓库中，我也做了镜像：https://github.com/happypeter/NervFirst/tree/master/complete/first_forever 。
