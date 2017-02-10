///////////
//
//  全局使用的部分
//
////////////

let marked = require('marked');
let hljs = require("highlight.js");

    marked.setOptions({
    renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight:function(code){return hljs.highlightAuto(code).value;}
    });



let fs = require('fs');

function getPostList() {
  let path = __dirname + "/src/posts.json";
  return fs.readFileSync(path);
}

let list = getPostList();
let distDir = __dirname + '/dist';



///////////
//
//  现在来生成 index.html 也就是首页视频列表
//
////////////


function episodeCard(item) {
  return `
  <a class="item" href="/v/${item.id}.html">
    <span class="left">${item.id}</span>
    <span class="right">
      <span class="title">${item.title}</span>
      <span class="date">${item.created_at}</span>
    </span>
  </a>`
}


function wrapIndex(cardList) {
  let templatePath = __dirname + '/src/layout/home.html'
  let template = fs.readFileSync(templatePath).toString();
  let indexContent = template.replace('<%= contents %>', cardList)
  return indexContent;
}

function genHomePage(list) {
  let arr = JSON.parse(list);
  let cards = arr.map(function(item, i) {
    return episodeCard(item);
  });
  let cardList = cards.reverse().join('\n');
  let dir = __dirname + '/dist';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  let path = `${dir}/index.html`;
  let content = wrapIndex(cardList);

  return fs.writeFileSync(path, content);
}

genHomePage(list); //  生成首页的 index.html

///////////
//
//  下面代码来生成各个视频的页面，例如 dist/v/1.html
//
////////////

function slogan(item) {
  return `<div class="slogan">
  <div class="title">${item.title}</div>
  <div class="date">${item.created_at}</div>
</div>\n`
}

function video(item) {
  return `<div class="video-wrapper">
  <video controls>
    <source src="http://haoduo-1253322599.costj.myqcloud.com/${item.name}.mp4" type="video/mp4" />
  </video>
</div>\n\n`
}

function getPost(post) {
  let postPath = __dirname + `/src/posts/${post}.md`;
  return fs.readFileSync(postPath).toString();
}

function wrapPost(post) {
  let templatePath = __dirname + '/src/layout/default.html'
  let template = fs.readFileSync(templatePath).toString();
  let postContent = template.replace('<%= contents %>', post)
  return postContent;
}

let arr = JSON.parse(list);

if(!fs.existsSync(distDir)) fs.mkdirSync(distDir);

if(!fs.existsSync(`${distDir}/v`)) fs.mkdirSync(`${distDir}/v`);

arr.forEach(function(item, i) {
  let str = slogan(item);
  let media = video(item);
  let postPath = __dirname + `/dist/v/${i+1}.html`;
  let postContent = marked(getPost(i+1));
  // TODO: add code highlighting
  let postPageContent = wrapPost(str + media + postContent);
  fs.writeFileSync(postPath, postPageContent);
})


///////////
//
//  拷贝 assets ： css ，图片等等
//
////////////

let cssDir = __dirname + '/src/css';
let distCssDir = __dirname + '/dist' + '/css';

if(!fs.existsSync(distCssDir)){
  fs.mkdirSync(distCssDir);
}

fs.createReadStream(`${cssDir}/main.css`).pipe(fs.createWriteStream(`${distCssDir}/main.css`));
fs.createReadStream(`${cssDir}/highlight.css`).pipe(fs.createWriteStream(`${distCssDir}/highlight.css`));

let searchFilePath = __dirname + '/src/search.html';
let distSearchFilePath = distDir + '/search.html';
fs.createReadStream(searchFilePath).pipe(fs.createWriteStream(distSearchFilePath));

///////////
//
//  启动服务器
//
////////////

var express = require('express');
var app = express();

app.use(express.static('dist'));
// 用跟本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});
