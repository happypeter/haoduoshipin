
## NOTE

posts 目录就是好多视频文字稿存放位置，中包含 index.json 文件，和 videos 目录

## Deploy

```
yarn
yarn build
```

静态输出存放在输出 public 目录，即静态文件所在目录

需要把

```
mv public/* ../haoduoshipin.github.io 
cp -rf utils/* ../haoduoshipin.github.io 
```

都存放到 deployment repo 的顶级位置 https://github.com/haoduoshipin/haoduoshipin.github.io 。
