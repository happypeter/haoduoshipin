var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function getPostList() {
  var path = __dirname + "/src/posts.json";
  return fs.readFileAsync(path);
}

function newPostList(content) {
  var dir = __dirname + '/build';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  var path = __dirname + "/build/index.md";
  return fs.writeFileAsync(path, content);
}

function getPost(index) {
  var postPath = __dirname + `/src/posts/${index}.md`;
  return fs.readFileAsync(postPath);
}

function cardTemp(item) {
  return `
  <a class="item" href="http://localhost:3000/v/${item.id}.html">
    <span class="left">${item.id}</span>
    <span class="right">
      <span class="title">${item.title}</span>
      <span class="date">${item.created_at}</span>
    </span>
  </a>`
}

function slogan(item) {
  return `<div class="slogan">
  <div class="title">${item.title}</div>
  <div class="date">${item.created_at}</div>
</div>\n`
}

function video(item) {
  return `<div class="video-wrapper">
  <video controls>
    <source src="http://7xnm4l.com1.z0.glb.clouddn.com/${item.name}.mp4" type="video/mp4" />
  </video>
</div>\n\n`
}

getPostList().then(function(list) {
  var arr = JSON.parse(list);
  var cards = arr.map(function(item, i) {
    return cardTemp(item);
  });
  newPostList(cards.reverse().join('\n'));
  var dir = __dirname + '/build/v';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  arr.forEach(function(item, i) {
    var str = slogan(item);
    var media = video(item);
    var postPath = __dirname + `/build/v/${i+1}.md`;
    getPost(i+1).then(function(content) {
      fs.writeFileAsync(postPath, str + media + content);
    })
  })
})
