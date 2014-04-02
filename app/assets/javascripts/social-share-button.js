$(function(){
  window.SocialShareButton = {
    openUrl: function(url) {
      window.open(url);
      return false;
    },
    share: function(el) {
      var site, title, url;
      site = $(el).data('site');
      title = encodeURIComponent($(el).parent().data('title'));
      url = encodeURIComponent($(el).parent().data("url"));
      img = encodeURIComponent($(el).parent().data("img"));
      if (url.length === 0) {
        url = encodeURIComponent(location.href);
      }
      //img_url = encodeURIComponent(location.protocol + "//" + location.host) + img;
      switch (site) {
        case "weibo":
          SocialShareButton.openUrl("http://service.weibo.com/share/share.php?url=" + url + "&type=3" + "&pic=" + img + "&title=" + title);
          break;
        case "tqq":
          SocialShareButton.openUrl("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + url +"&title=" + title + "&pic=" + img);
      }
      return false;
    }
  };
});
