//= require jquery
//= require jquery_ujs
//= require editable_comment
//= require jquery.atwho
//= require vendor/jquery_hotkeys
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
  $('.latest-comment').append("<a href=/episodes/" + data.episode_id + "#ep_comment_"
    + data.comment_id + ">" + data.user + ": "+ data.content + "</a>");
});
