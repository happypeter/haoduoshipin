//= require jquery
//= require jquery_ujs
//= require editable_comment
//= require vendor/jquery_hotkeys
//= require vendor/jquery.timeago
//= require vendor/jquery.timeago.zh-CN
//= require jquery.atwho
//= require_self

var commenter = [];
var commenter_exist= [];
$('.comment_head a').each(function() {
  if($.inArray($(this).text(), commenter_exist) < 0){
    commenter.push($(this).text());
    commenter_exist.push($(this).text());
  }
});
$('textarea').atWho('@', {data: commenter});

$.ajax({
  url: "/latest_comment.json",
  cache: false
}).done(function(data) {
  var time = data.timestamp;
  $("abbr.timeago").attr("title", time);
  $("abbr.timeago").append(time);
  $("abbr.timeago").timeago();

  $(".recent-comment .profile").append("<a href=/users/" + data.user_id +
   "><img src=" + data.profile_url + "></a>");

  $(".latest-comment").append("<a href=/episodes/" + data.episode_id +
    "#ep_comment_"+ data.comment_id + ">" + data.content + "</a>");
});
