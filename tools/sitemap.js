const fs = require('fs');

function urlTemp(item) {
  const year = item.created_at.split('年')
  const month = year[1].split('月')
  const day = month[1].split('日')

  return `
  <url>
    <loc>http://www.haoduoshipin.com/v/${item.id}.html</loc>
    <lastmod>${year[0]}-${month[0]}-${day[0]}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
    <data>
      <display>
        <title>${item.title}</title>
      </display>
    </data>
  </url>
  `
}

const path = __dirname + "/src/posts.json";

const arr = JSON.parse(fs.readFileSync(path));
const urls = arr.map(function(item, i) {
  return urlTemp(item);
});

const str = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  ${urls.join('').trim()}
</urlset>
`

fs.writeFileSync('./sitemap.xml', str);
