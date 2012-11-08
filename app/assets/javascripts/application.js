//= require jquery
//= require jquery_ujs
//= require vendor/jquery.jplayer.min
//= require bootstrap
//= require editable_comment
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

