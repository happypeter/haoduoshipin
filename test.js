let marked = require('marked');
let fs = require('fs');


// function getPost(post) {
//   let postPath = __dirname + `/src/posts/${post}.md`;
//   return fs.readFileSync(postPath);
// }
// getPost(1).then(function(content) {
//   console.log(marked(content.toString()));
// })


// 现在来生成 index.html 也就是首页视频列表
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


function wrapContent(cardList) {
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


  let content = wrapContent(cardList);

  return fs.writeFileSync(path, content);
}

function getPostList() {
  let path = __dirname + "/src/posts.json";
  return fs.readFileSync(path);
}

let list = getPostList();

genHomePage(list)
