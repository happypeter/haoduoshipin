///////////
//
//  全局使用的部分
//
////////////

let marked = require('marked');
let fs = require('fs');

function getPostList() {
  let path = __dirname + "/src/posts.json";
  return fs.readFileSync(path);
}

let list = getPostList();


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
  let dir = __dirname + '/tmp';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  let path = __dirname + "/tmp/index.html";
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

var arr = JSON.parse(list);

arr.forEach(function(item, i) {
  var str = slogan(item);
  var media = video(item);
  var dir = __dirname + '/dist/v';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  var postPath = __dirname + `/dist/v/${i+1}.html`;
  let postContent = marked(getPost(i+1));
  let postPageContent = wrapPost(str + media + postContent);
  fs.writeFileSync(postPath, postPageContent);
})
