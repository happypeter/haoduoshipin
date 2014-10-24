//= require jquery
//= require jquery_ujs
//= require social-share-button
//= require vendor/jquery.timeago
//= require vendor/jquery.timeago.zh-CN
//= require jquery.atwho
//= require_self

$(function() {
  var commenter = [];
  var commenter_exist = [];
  $('.comment_head a').each(function() {
    if($.inArray($(this).text(), commenter_exist) < 0) {
      commenter.push($(this).text());
      commenter_exist.push($(this).text());
    }
  });
  $('textarea').atwho({ at: "@", 'data': commenter });
});

