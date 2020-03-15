合约部署完毕，真正的开发过程中就可以写 React 代码来跟合约进行交互了。但是咱们课程中为了演示清楚，先抛开 React ，通过写简单的 JS 脚本的形式，跟合约交互一下。

## 准备工作

交互这部分的代码，我们也放到一个单独的名叫 interact/ 文件夹中。interact 文件夹中的很多文件其实跟 deploy 文件夹中的代码很类似。

config.js 中的内容跟 deploy 文件夹中的 config 内容基本一致，唯一的区别是添加了合约地址，contractAddress 这一项。显然，知道合约地址，才能跟合约进行交互。代码在 Github 仓库中：https://github.com/happypeter/NervFirst/blob/master/interact/config.js 。

nervos.js 和 transaction.js 跟 deploy 文件夹中的内容完全一样，直接拷贝过来即可。代码在 Github 仓库中也可以看到：https://github.com/happypeter/NervFirst/blob/master/interact 。

比较大的区别是 compiled.js 没有了，多了一个 simpleStore.js 

```js
const nervos = require('./nervos')
const { contractAddress } = require('./config')

const abi = [...]

const transaction = require('./transaction')
const simpleStoreContract = new nervos.appchain.Contract(abi, contractAddress)
module.exports = {
  transaction,
  simpleStoreContract
}
```

导入 nervos 和 contractAddress ，ABI 在跟合约交互的时候还是需要的，所以从原来的 compiled.js 中拷贝过来粘贴到这里。导入交易，创建合约实例并导出。


## 主要交互代码

主要交互工作放到 index.js 文件中来进行。

```js
const nervos = require('./nervos')
const simpleStore = require('./simpleStore')
const text = `hello ${new Date()}`
const time = new Date()
;(async function() {
  const current = await nervos.appchain.getBlockNumber()
  const tx = {
    ...simpleStore.transaction,
    validUntilBlock: +current + 88
  }
  const res = await simpleStore.simpleStoreContract.methods
    .add(text, +time)
    .send(tx)

  const receipt = await nervos.listeners.listenToTransactionReceipt(res.hash)
  receipt.errorMessage && console.log(receipt.errorMessage)
  const from =
    nervos.appchain.accounts.wallet[0] &&
    nervos.appchain.accounts.wallet[0].address

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
})()
```

index.js 中我们会跟合约中的一个写接口也就是 `add` 和两个读接口 `get` 和 `getList` 进行交互。

先来看写操作。add 接口接收两个参数，一个是时间，一个是留言。接下来，调用合约实例的 add 接口进行数据的写入，注意写入操作时通过发送交易进行的，所以这里用到了 `send` 接口。而后续的读操作不需要发送交易，所以只需要 `call` 也就是调用一下即可。

数据上链后需要经过至少3S的入块共识，这是因为 AppChain 的产出一个块的时间就是三秒。所以如果要保证写入真的成功了，就需要监听入块事件，所以会用到 `listenToTransactionReceipt` ，如果返回信息中包含报错，表示数据写入失败了。而对于后续的读操作，则不需要等待这个共识时间。

如果没有显示报错信息，就证明写入成功，所以下面的代码来读取链上数据。分别调用 `getList` 读取出时间列表，然后根据时间列表，通过 `get` 接口就可以把所有的留言读取到。

命令行中执行 `node index.js` ，可以看到果然成功读取到了最新写入的时间和留言。

## 总结

可以看到，由于有了 Nervos.js 的辅助，跟合约交互就是简单的接口调用，没有超出一个普通开发者的知识范围。我们成功的完成了使用 JS 代码跟合约进行读和写的交互操作，下一步就可以真正动手去写 App ，或者说就是写一个友好的 UI 了。最后要说明一下，本节的内容参考了 Nervos 官方的案例文档： https://github.com/cryptape/nervos-appchain-docs/blob/develop/zh-CN/quick-start/build-dapp.md 。
